import type {Request, Response} from "express";
import { ReservationService } from "./reservation.service.js";
import { CreateReservationSchema } from "./reservation.dto.js";

export class ReservationController{
    private service = new ReservationService();

    async handleCreateReservation(req: Request, res: Response){
        try{
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Bejelentkezés szükséges" });
            }

            const validatedData = CreateReservationSchema.parse(req.body);

            const reservation = await this.service.createReservation(req.user.id, validatedData);

            res.status(201).json({succes: true, data: reservation})
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Ismeretlen hiba történt';
            res.status(400).json({ success: false, message: errorMessage });
        }
    }
}