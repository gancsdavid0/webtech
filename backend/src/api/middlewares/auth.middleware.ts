import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../../infrastructure/database/prisma.js';

// Definiáljuk a tokenben tárolt adatok szerkezetét
interface JwtPayload {
    id: number;
    role: string;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Hozzáférés megtagadva. Hiányzó token.'
        });
    }

    try {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            console.error("HIBA: JWT_SECRET nincs definiálva a környezeti változókban!");
            return res.status(500).json({ success: false, message: "Szerver konfigurációs hiba." });
        }

        const isBlacklisted = await prisma.blacklistedToken.findUnique({
            where: { token }
        });

        if (isBlacklisted) {
            return res.status(401).json({ success: false, message: 'A munkamenet lejárt. Jelentkezz be újra.' });
        }

        const decoded = jwt.verify(token, secret) as JwtPayload;

        req.user = {
            id: decoded.id,
            role: decoded.role as any
        };

        next();
    } catch (err) {
        return res.status(403).json({
            success: false,
            message: 'Érvénytelen vagy lejárt token.'
        });
    }
};

export const authorize = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Nincs jogosultságod a művelet végrehajtásához.'
            });
        }
        next();
    };
};