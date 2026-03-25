import { z } from 'zod';
import {ReservationStatus} from "@prisma/client";

export const CreateReservationSchema = z.object({
    spotId: z.number({ message: "Parkolóhely azonosító kötelező" }),
    vehicleId: z.number().optional(),
    startTime: z.iso.datetime({ message: "Érvénytelen kezdési időpont" }),
    endTime: z.iso.datetime({ message: "Érvénytelen lejárati időpont" }),
});
export const UpdateReservationSchema = z.object({
    startTime: z.string().datetime().optional(),
    endTime: z.string().datetime().optional(),
});

export const ChangeStatusSchema = z.object({
    status: z.nativeEnum(ReservationStatus)
});
export type CreateReservationDto = z.infer<typeof CreateReservationSchema>;