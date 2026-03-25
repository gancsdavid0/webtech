import type { Response } from 'express';
import { Role } from '@prisma/client';
import bcrypt from 'bcrypt';

import { UserRepository } from '../../infrastructure/repositories/user.repository.js';
import {UpdateUserRoleSchema, UpdateUserSchema} from "../../domain/dtos/user.dto.js";

export class UserController {
    private repo = new UserRepository();

    async getAll(req: any, res: Response) {
        try {
            const users = await this.repo.findAll();
            res.json(users);
        } catch (err) {
            res.status(500).json({ success: false, message: "Hiba a listázás során." });
        }
    }

    async getById(req: any, res: Response) {
        const id = parseInt(req.params.id);
        const { id: currentUserId, role } = req.user;

        if (role !== 'ADMIN' && currentUserId !== id) {
            return res.status(403).json({ success: false, message: "Nincs jogosultságod a profil megtekintéséhez!" });
        }

        const user = await this.repo.findById(id);
        if (!user) return res.status(404).json({ success: false, message: "Felhasználó nem található" });

        res.json(user);
    }

    async update(req: any, res: Response) {
        const id = parseInt(req.params.id);
        const { id: currentUserId, role: currentUserRole } = req.user;

        if (currentUserRole !== 'ADMIN' && currentUserId !== id) {
            return res.status(403).json({ success: false, message: "Nincs jogosultságod más profilját módosítani!" });
        }

        const validation = UpdateUserSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ success: false, errors: validation.error.format() });
        }

        try {
            const updateData: any = { ...validation.data };

            if (updateData.password) {
                const salt = await bcrypt.genSalt(10);
                updateData.password = await bcrypt.hash(updateData.password, salt);
            }

            const updatedUser = await this.repo.update(id, updateData);
            res.json({ success: true, data: updatedUser });
        } catch (err: any) {
            res.status(400).json({ success: false, message: "Sikertelen frissítés: " + err.message });
        }
    }

    async delete(req: any, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { id: currentUserId } = req.user;

            if (currentUserId === id) {
                return res.status(400).json({ success: false, message: "Saját magadat nem törölheted!" });
            }

            await this.repo.delete(id);
            res.json({ success: true, message: "Felhasználó törölve" });
        } catch (err) {
            res.status(400).json({ success: false, message: "A törlés sikertelen." });
        }
    }

    async changeRole(req: any, res: Response) {
        const validation = UpdateUserRoleSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Érvénytelen szerepkör!",
                errors: validation.error.format()
            });
        }

        try {
            const targetUserId = parseInt(req.params.id);
            const { role } = validation.data;
            const { id: currentUserId } = req.user;

            if (targetUserId === currentUserId) {
                return res.status(400).json({
                    success: false,
                    message: "Saját szerepkörödet nem módosíthatod ezen a végponton!"
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