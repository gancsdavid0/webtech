import {prisma} from "../database/prisma.js";
import type {IAuthRepository} from '../../domain/repositories/auth.repository.interface.js';

export class AuthRepository implements IAuthRepository {
    async create(data: { email: string; fullName: string; passwordHash: string }) {
        return prisma.user.create({
            data: {
                email: data.email,
                password: data.passwordHash,
                fullName: data.fullName,
            }
        })
    }

    async findByEmail(email: string) {
        return prisma.user.findUnique({where: {email}})
    }
}