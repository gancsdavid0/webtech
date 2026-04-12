import { z } from 'zod';

export const CreateReservationSchema = z.object({
    spotId: z.number({ message: "Parkolóhely azonosító kötelező" }).int().positive("Érvénytelen parkolóhely azonosító"),
    vehicleId: z.number().int().positive("Érvénytelen jármű azonosító"),
    startTime: z.iso.datetime({ message: "Érvénytelen kezdési időpont" }),
    endTime: z.iso.datetime({ message: "Érvénytelen lejárati időpont" }),
});
export const UpdateReservationSchema = z.object({
    startTime: z.string().datetime().optional(),
    endTime: z.string().datetime().optional(),
});

