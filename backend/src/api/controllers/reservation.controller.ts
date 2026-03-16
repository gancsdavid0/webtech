import {CreateReservationHandler} from "../../application/reservation/handlers/CreateReservationHandler.js";
import { CreateReservationCommand } from '../../application/reservation/commands/CreateReservationCommand.js';
import {CreateReservationSchema} from "../../domain/dtos/reservation.dto.js";
import {
    FindAllActiveReservationsByUserIdHandler
} from "../../application/reservation/handlers/findAllActiveReservationsByUserIdHandler.js";
import {
    FindAllActiveReservationsByUserIdQuery
} from "../../application/reservation/queries/findAllActiveReservationsByUserIdQueries.js";

export class ReservationController{
    private CreateHandler = new CreateReservationHandler();
    private findAllActiveReservationsByUserIdHandler = new FindAllActiveReservationsByUserIdHandler();

    async create(req: any, res: any) {
        try {
            const validatedData = CreateReservationSchema.parse(req.body);
            const command = new CreateReservationCommand(
                req.user.id,
                validatedData.spotId,
                new Date(validatedData.startTime),
                new Date(validatedData.endTime)
            );
            const result = await this.CreateHandler.handle(command);
            res.status(201).json(result);
        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async FindAllActiveReservationsByUserId(req: any, res: any) {
        try {
            const targetUserId = req.params.userId ? parseInt(req.params.userId) : req.user.id;
            const currentUser = req.user;
            if (!currentUser) {
                return res.status(401).json({ success: false, message: "Nincs hitelesített felhasználó." });
            }
            if (currentUser.role !== 'ADMIN' && currentUser.id !== targetUserId) {
                return res.status(403).json({
                    success: false,
                    message: "Nincs jogosultságod más felhasználó foglalásait megtekinteni!"
                });
            }
            const query = new FindAllActiveReservationsByUserIdQuery(targetUserId)
            const result = this.findAllActiveReservationsByUserIdHandler.handle(query);

            res.status(200).json(result);
        }catch (err: any) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
}