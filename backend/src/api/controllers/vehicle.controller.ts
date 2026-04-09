import type {  Response } from 'express';
import type {VehicleHandler} from "../../application/Vehicle/handlers/vehicle.handler.js";

export class VehicleController {
    constructor(private handler: VehicleHandler) {}

    create = async (req: any, res: Response) => {
        try {
            const vehicle = await this.handler.createVehicle(req.user.id, req.body);
            res.status(201).json(vehicle);
        } catch (error: any) {
            res.status(403).json({ message: error.message });
        }
    };

    listByOwner = async (req: any, res: Response) => {
        try {
            const ownerId = parseInt(req.params.ownerId);
            const vehicles = await this.handler.getOwnerVehicles(req.user.id, ownerId, req.user.role);
            res.json(vehicles);
        } catch (error: any) {
            res.status(403).json({ message: error.message });
        }
    };

    update = async (req: any, res: Response) => {
        try {
            const vehicleId = parseInt(req.params.id);
            const currentUserId = req.user.id;

            if (isNaN(vehicleId)) {
                return res.status(400).json({ error: 'Érvénytelen jármű azonosító.' });
            }

            const updatedVehicle = await this.handler.updateVehicle(
                vehicleId,
                currentUserId,
                req.body
            );

            res.status(200).json({
                message: 'Jármű adatai sikeresen frissítve.',
                data: updatedVehicle
            });

        } catch (error: any) {
            if (error.message.includes('nem található')) {
                return res.status(404).json({ error: error.message });
            }

            if (error.message.includes('jogosultság')) {
                return res.status(403).json({ error: error.message });
            }

            res.status(400).json({ error: error.message });
        }
    };

    delete = async (req: any, res: Response) => {
        try {
            const vehicleId = parseInt(req.params.id);

            console.log("User a kérésben:", req.user);

            if (!req.user) {
                return res.status(401).json({ error: "Nincs azonosítva a felhasználó!" });
            }

            await this.handler.deleteVehicle(vehicleId, req.user.id);
            res.status(204).send();
        } catch (error: any) {
            res.status(403).json({ error: error.message });
        }
    };
}