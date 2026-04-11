import {CreateReservationHandler} from "../../application/reservation/handlers/CreateReservationHandler.js";
import { CreateReservationCommand } from '../../application/reservation/commands/CreateReservationCommand.js';
import {CreateReservationSchema, UpdateReservationSchema} from "../../domain/dtos/reservation.dto.js";
import {
    FindAllActiveReservationsByUserIdHandler
} from "../../application/reservation/handlers/findAllActiveReservationsByUserIdHandler.js";
import {
    FindAllActiveReservationsByUserIdQuery
} from "../../application/reservation/queries/findAllActiveReservationsByUserIdQueries.js";
import {GetReservationByIdQuery} from "../../application/reservation/queries/GetReservationByIdQuery.js";
import {UpdateReservationCommand} from "../../application/reservation/commands/UpdateReservationCommand.js";
import {UpdateReservationHandler} from "../../application/reservation/handlers/UpdateReservationHandler.js";
import {CancelReservationHandler} from "../../application/reservation/handlers/CancelReservationHandler.js";
import {CancelReservationCommand} from "../../application/reservation/commands/CancelReservationCommand.js";
import {GetReservationByIdHandler} from "../../application/reservation/handlers/GetReservationByIdHandler.js";
import {FindAllReservationsHandler} from "../../application/reservation/handlers/FindAllReservationsHandler.js";
import {FindAllReservationsQuery} from "../../application/reservation/queries/FindAllReservationsQuery.js";

export class ReservationController{
    private CreateHandler = new CreateReservationHandler();
    private findAllActiveReservationsByUserIdHandler =  new FindAllActiveReservationsByUserIdHandler();
    private updateHandler = new UpdateReservationHandler();
    private cancelHandler = new CancelReservationHandler();
    private getByIdHandler = new GetReservationByIdHandler();
    private findAllHandler = new FindAllReservationsHandler();

    async create(req: any, res: any) {
        try {
            const validatedData = CreateReservationSchema.parse(req.body);
            const command = new CreateReservationCommand(
                req.user.id,
                validatedData.spotId,
                new Date(validatedData.startTime),
                new Date(validatedData.endTime),
                validatedData.vehicleId
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
            const result = await this.findAllActiveReservationsByUserIdHandler.handle(query);

            res.status(200).json(result);
        }catch (err: any) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async getById(req: any, res: any) {
        try {
            const id = parseInt(req.params.id);
            const reservation = await new GetReservationByIdHandler().handle(new GetReservationByIdQuery(id));

            if (!reservation) return res.status(404).json({ message: "Nincs ilyen foglalás." });

            if (req.user.role !== 'ADMIN' && reservation.userId !== req.user.id) {
                return res.status(403).json({ message: "Nincs jogod ehhez." });
            }

            res.json(reservation);
        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async update(req: any, res: any) {
        try {
            const id = parseInt(req.params.id);
            const validated = UpdateReservationSchema.parse(req.body);

            const reservation = await this.getByIdHandler.handle(new GetReservationByIdQuery(id));
            if (!reservation) return res.status(404).json({ message: "Foglalás nem található." });

            if (req.user.role !== 'ADMIN' && reservation.userId !== req.user.id) {
                return res.status(403).json({ message: "Csak a saját foglalásodat módosíthatod!" });
            }

            const command = new UpdateReservationCommand(
                id,
                validated.startTime ? new Date(validated.startTime) : undefined,
                validated.endTime ? new Date(validated.endTime) : undefined
            );

            const result = await this.updateHandler.handle(command);
            res.json(result);
        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async cancel(req: any, res: any) {
        try {
            const id = parseInt(req.params.id);

            const reservation = await this.getByIdHandler.handle(new GetReservationByIdQuery(id));
            if (!reservation) return res.status(404).json({ message: "Foglalás nem található." });

            if (req.user.role !== 'ADMIN' && reservation.userId !== req.user.id) {
                return res.status(403).json({ message: "Nincs jogod lemondani ezt a foglalást!" });
            }

            const result = await this.cancelHandler.handle(new CancelReservationCommand(id));
            res.json({ success: true, message: "Foglalás lemondva.", data: result });
        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async getAll(req: any, res: any) {
        try {
            const query = new FindAllReservationsQuery();
            const result = await this.findAllHandler.handle(query);

            res.status(200).json({
                success: true,
                count: result.length,
                data: result
            });
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: "Nem sikerült a foglalások listázása."
            });
        }
    }
}