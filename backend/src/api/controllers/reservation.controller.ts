import {CreateReservationHandler} from "../../application/handlers/CreateReservationHandler.js";
import { CreateReservationCommand } from '../../application/commands/CreateReservationCommand.js';
import {CreateReservationSchema} from "../../domain/dtos/reservation.dto.js";

export class ReservationController{
    private CreateHandler = new CreateReservationHandler();

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
}