import { z } from 'zod';
import { Role } from '@prisma/client';

export const CreateUserSchema = z.object({
    email: z.string().email({ message: "Érvénytelen email cím" }),
    password: z.string().min(6, { message: "A jelszónak legalább 6 karakternek kell lennie" }),
    name: z.string().min(2, { message: "A név túl rövid" }).optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
    email: z.string().email().optional(),
    name: z.string().min(2).optional(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

export const UpdateUserRoleSchema = z.object({
    role: z.enum(["USER", "ADMIN", "RECEPTION"], {
        message: "Érvénytelen szerepkör"
    }),
});

export type UpdateUserRoleDto = z.infer<typeof UpdateUserRoleSchema>;

export interface UserResponseDto {
    id: number;
    email: string;
    name: string | null;
    role: Role;
    createdAt: Date;
}