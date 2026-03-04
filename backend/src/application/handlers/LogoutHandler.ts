import { LogoutSchema } from '../../domain/dtos/auth.dto.js';
import jwt from 'jsonwebtoken';
import { redis } from '../../infrastructure/database/redis.js';

export class LogoutHandler {
    async handle(rawData: unknown) {
        const { token } = LogoutSchema.parse(rawData);
        const decoded = jwt.decode(token) as { exp: number };
        const now = Math.floor(Date.now() / 1000);
        const secondsUntilExpiry = decoded.exp - now;

        if (secondsUntilExpiry > 0) {
            await redis.set(`blacklist:${token}`, '1', 'EX', secondsUntilExpiry);
        }
        return { success: true, message: "Sikeres kijelentkezés" };
    }
}