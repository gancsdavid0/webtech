import { z } from 'zod';

export const CreateParkingZoneSchema = z.object({
    name: z.string().min(3, "A név túl rövid"),
    address: z.string().min(5, "A cím túl rövid"),
    description: z.string().optional(),
});

export type CreateParkingZoneInput = z.infer<typeof CreateParkingZoneSchema>;