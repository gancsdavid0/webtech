import type { Request, Response } from 'express';
import { Role } from '@prisma/client';
import bcrypt from 'bcrypt';

import { UserRepository } from '../../infrastructure/repositories/user.repository.js';

export class UserController {
    private repo = new UserRepository();

    async getAll(req: any, res: Response) {
        const users = await this.repo.findAll();
        res.json(users);
    }

    async getById(req: any, res: Response) {
        const id = parseInt(req.params.id);
        const user = await this.repo.findById(id);
        const { id: currentUserId, role } = req.user;
        if (role !== 'ADMIN' && currentUserId !== id) {
            return res.status(403).json({ message: "Nincs jogosultságod más profilját módosítani!" });
        }
        if (!user) return res.status(404).json({ message: "Felhasználó nem található" });
        res.json(user);
    }

    async update(req: any, res: Response) {
        const id = parseInt(req.params.id);
        const { id: currentUserId, role } = req.user;

        // Csak admin vagy a saját maga profilját módosíthatja
        if (role !== 'ADMIN' && currentUserId !== id) {
            return res.status(403).json({ message: "Nincs jogosultságod más profilját módosítani!" });
        }

        try {
            const updateData = { ...req.body };

            // Jelszó hashelése, ha érkezett a kérésben
            if (updateData.password && updateData.password.trim() !== '') {
                const salt = await bcrypt.genSalt(10);
                updateData.password = await bcrypt.hash(updateData.password, salt);
            } else {
                // Ha üres vagy nincs megadva, töröljük a mezőt
                delete updateData.password;
            }

            const updatedUser = await this.repo.update(id, updateData);
            res.json(updatedUser);
        } catch (err) {
            res.status(400).json({ message: "Sikertelen frissítés" });
        }
    }

    async delete(req: any, res: Response) {
        const id = parseInt(req.params.id);
        await this.repo.delete(id);
        res.json({ success: true, message: "Felhasználó törölve" });
    }

    async changeRole(req: any, res: Response) {
        try {
            const targetUserId = parseInt(req.params.id);
            const { role } = req.body;

            if (!Object.values(Role).includes(role)) {
                return res.status(400).json({
                    success: false,
                    message: `Érvénytelen szerepkör. Lehetséges értékek: ${Object.values(Role).join(', ')}`
                });
            }

            const updatedUser = await this.repo.updateRole(targetUserId, role as Role);

            res.json({
                success: true,
                message: `Felhasználó (${updatedUser.email}) új szerepköre: ${updatedUser.role}`,
                data: updatedUser
            });
        } catch (err: any) {
            res.status(400).json({ success: false, message: "Nem sikerült a szerepkör módosítása." });
        }
    }
}