import type { Request, Response } from 'express';
import { ParkingZoneRepository } from '../../infrastructure/repositories/parking-zone.repository.js';
import { CreateParkingZoneSchema } from '../../domain/dtos/parking-zone.dto.js';
import {CreateParkingZoneHandler} from "../../application/parking-zone/handlers/CreateParkingZoneHandler.js";
import {DeleteParkingZoneHandler} from "../../application/parking-zone/handlers/DeleteParkingZoneHandler.js";

export class ParkingZoneController {
    private createHandler = new CreateParkingZoneHandler();
    private deleteHandler = new DeleteParkingZoneHandler();
    private repo = new ParkingZoneRepository();

    async create(req: Request, res: Response) {
        try {
            const validedData = CreateParkingZoneSchema.parse(req.body);
            const result = await this.createHandler.handle(validedData);
            res.status(201).json(result);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    async getAll(req: Request, res: Response) {
        const zones = await this.repo.findAll();
        res.json(zones);
    }

    async getById(req: Request, res: Response) {
        const zone = await this.repo.findById(Number(req.params.id));
        if (!zone) return res.status(404).json({ message: "Zóna nem található" });
        res.json(zone);
    }

    async delete(req: any, res: any) {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({ success: false, message: "Érvénytelen ID formátum." });
            }

            await this.deleteHandler.handle(id);

            res.status(200).json({
                success: true,
                message: "Parkoló zóna sikeresen törölve."
            });
        } catch (err: any) {
            res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }
}