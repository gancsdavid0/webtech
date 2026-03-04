import { prisma } from '../../infrastructure/database/prisma.js';
import { LogoutSchema } from '../../domain/dtos/auth.dto.js';
import jwt from 'jsonwebtoken';

export class LogoutHandler {
    async handle(rawData: unknown) {
        const { token } = LogoutSchema.parse(rawData);
        const decoded = jwt.decode(token) as { exp: number };
        const expiresAt = decoded && decoded.exp
            ? new Date(decoded.exp * 1000)
            : new Date(Date.now() + 24 * 60 * 60 * 1000);

        await prisma.blacklistedToken.create({
            data: {
                token,
                expiresAt
            }
        });

        return { success: true, message: "Sikeres kijelentkezés" };
    }
}