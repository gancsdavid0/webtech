import {CreateReservationHandler} from "../../application/handlers/CreateReservationHandler.js";

export class ReservationController{
    private handler = new CreateReservationHandler();

    async create(req: any, res: any) {
        try {
            const userId = req.user.id;
            const result = await this.handler.handle({
                ...req.body,
                userId: userId
            });
            res.status(201).json(result);
        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
}