import { PrismaClient } from '@prisma/client';
import { Role } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
    async findAll() {
        return prisma.user.findMany({
            select: { id: true, email: true, fullName: true, role: true, createdAt: true }
        });
    }

    async findById(id: number) {
        return prisma.user.findUnique({
            where: { id },
            select: { id: true, email: true, fullName: true, role: true }
        });
    }

    async update(id: number, data: { name?: string; email?: string; role?: any }) {
        return prisma.user.update({
            where: { id },
            data,
            select: { id: true, email: true, fullName: true, role: true }
        });
    }

    async delete(id: number) {
        return prisma.user.delete({ where: { id } });
    }


    async updateRole(id: number, newRole: Role) {
        return prisma.user.update({
            where: { id },
            data: { role: newRole },
            select: { id: true, email: true, role: true } // Visszaigazoljuk a változást
        });
}
}