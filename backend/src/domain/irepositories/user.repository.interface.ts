import type { User, Role } from '@prisma/client';

export interface UpdateUserData {
    email?: string;
    password?: string;
    fullName?: string;
    role?: Role;
}

export interface IUserRepository {
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: number, data: UpdateUserData): Promise<User>;
    updateRole(id: number, role: Role): Promise<User>;
    delete(id: number): Promise<void>;
}