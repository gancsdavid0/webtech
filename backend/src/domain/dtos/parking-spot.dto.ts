import { z } from 'zod';
import { SpotType } from '@prisma/client';

export const CreateParkingSpotSchema = z.object({
    spotNumber: z.string().min(1, "A hely száma kötelező"),
    type: z.nativeEnum(SpotType).default(SpotType.NORMAL),
    parkingZoneId: z.number().int("Érvénytelen zóna azonosító"),
    isActive: z.boolean().optional().default(true)
});

export const UpdateParkingSpotSchema = CreateParkingSpotSchema.partial();

export type CreateParkingSpotInput = z.infer<typeof CreateParkingSpotSchema>;
export type UpdateParkingSpotInput = z.infer<typeof UpdateParkingSpotSchema>;