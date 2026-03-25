import { prisma } from '../database/prisma.js';
import type { User, Role } from '@prisma/client';
import type { IUserRepository, UpdateUserData } from '../../domain/irepositories/user.repository.interface.js';

export class UserRepository implements IUserRepository {

    async findAll(): Promise<User[]> {
        return prisma.user.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }

    async findById(id: number): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id }
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email }
        });
    }

    async update(id: number, data: UpdateUserData): Promise<User> {
        return prisma.user.update({
            where: { id },
            data: data
        });
    }

    async updateRole(id: number, role: Role): Promise<User> {
        return prisma.user.update({
            where: { id },
            data: { role }
        });
    }

    async delete(id: number): Promise<void> {
        await prisma.user.delete({
            where: { id }
        });
    }
}