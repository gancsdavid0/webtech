import type {  Response } from 'express';
import type {VehicleHandler} from "../../application/Vehicle/handlers/vehicle.handler.js";
import { CreateVehicleSchema, UpdateVehicleSchema } from "../../domain/dtos/vehicle.dto.js";
import { z } from "zod";

export class VehicleController {
    constructor(private handler: VehicleHandler) {}

    private resolveStatus(error: any) {
        if (error instanceof z.ZodError) return 400;
        const message = error instanceof Error ? error.message.toLowerCase() : '';
        const normalized = message.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (normalized.includes('nem talalhato') || normalized.includes('not found')) return 404;
        if (normalized.includes('jogosultsag') || normalized.includes('unauthorized') || normalized.includes('forbidden')) return 403;
        if (normalized.includes('ervenytelen') || normalized.includes('invalid') || normalized.includes('validation')) return 400;
        return 500;
    }

    create = async (req: any, res: Response) => {
        try {
            const validated = CreateVehicleSchema.parse(req.body);
            const vehicle = await this.handler.createVehicle(req.user.id, {
                licensePlate: validated.licensePlate,
                ownerId: req.user.id,
                ...(validated.make !== undefined ? { make: validated.make } : {}),
                ...(validated.model !== undefined ? { model: validated.model } : {})
            });
            res.status(201).json(vehicle);
        } catch (error: any) {
            res.status(this.resolveStatus(error)).json({ message: error.message });
        }
    };

    listByOwner = async (req: any, res: Response) => {
        try {
            const ownerId = parseInt(req.params.ownerId);
            if (Number.isNaN(ownerId)) {
                return res.status(400).json({ error: 'Ervenytelen tulajdonos azonosito.' });
            }

            const vehicles = await this.handler.getOwnerVehicles(req.user.id, ownerId, req.user.role);
            res.json(vehicles);
        } catch (error: any) {
            res.status(this.resolveStatus(error)).json({ message: error.message });
        }
    };

    update = async (req: any, res: Response) => {
        try {
            const vehicleId = parseInt(req.params.id);
            const currentUserId = req.user.id;
            const validated = UpdateVehicleSchema.parse(req.body);
            const updateData: { make?: string; model?: string } = {};

            if (validated.make != null) {
                updateData.make = validated.make;
            }

            if (validated.model != null) {
                updateData.model = validated.model;
            }

            if (isNaN(vehicleId)) {
                return res.status(400).json({ error: 'Érvénytelen jármű azonosító.' });
            }

            const updatedVehicle = await this.handler.updateVehicle(
                vehicleId,
                currentUserId,
                updateData
            );

            res.status(200).json({
                message: 'Jármű adatai sikeresen frissítve.',
                data: updatedVehicle
            });

        } catch (error: any) {
            if (error.message.includes('nem talalhato')) {
                return res.status(404).json({ error: error.message });
            }

            if (error.message.includes('jogosultsag')) {
                return res.status(403).json({ error: error.message });
            }

            res.status(this.resolveStatus(error)).json({ error: error.message });
        }
    };

    delete = async (req: any, res: Response) => {
        try {
            const vehicleId = parseInt(req.params.id);

            if (Number.isNaN(vehicleId)) {
                return res.status(400).json({ error: 'Ervenytelen jarmu azonosito.' });
            }


            if (!req.user) {
                return res.status(401).json({ error: "Nincs azonosítva a felhasználó!" });
            }

            await this.handler.deleteVehicle(vehicleId, req.user.id);
            res.status(204).send();
        } catch (error: any) {
            res.status(this.resolveStatus(error)).json({ error: error.message });
        }
    };
}