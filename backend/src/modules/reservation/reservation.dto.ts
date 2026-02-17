import { z } from 'zod';

export const CreateReservationSchema = z.object({
    spotId: z.number({ message: "Parkolóhely azonosító kötelező" }),
    startTime: z.iso.datetime({ message: "Érvénytelen kezdési időpont" }),
    endTime: z.iso.datetime({ message: "Érvénytelen lejárati időpont" }),
});

export type CreateReservationDto = z.infer<typeof CreateReservationSchema>;