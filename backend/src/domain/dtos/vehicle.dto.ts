import { z } from 'zod';

export const CreateVehicleSchema = z.object({
    licensePlate: z.string({ message: 'Rendszám megadása kötelező' })
        .trim()
        .min(1, 'Rendszám megadása kötelező')
        .transform(value => value.toUpperCase()),
    make: z.string().trim().max(100).optional().nullable(),
    model: z.string().trim().max(100).optional().nullable(),
});

export const UpdateVehicleSchema = z.object({
    make: z.string().trim().max(100).optional(),
    model: z.string().trim().max(100).optional(),
});

export interface CreateVehicleDto {
    licensePlate: string;
    make?: string | null;
    model?: string | null;
    ownerId: number;
}

export interface UpdateVehicleDto {
    make?: string;
    model?: string;
}