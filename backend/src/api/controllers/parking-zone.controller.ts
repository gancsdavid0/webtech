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
        try {
            const zones = await this.repo.findAll();
            res.json(zones);
        } catch (err: any) {
            res.status(500).json({ success: false, message: "Nem sikerult a zonak listazasa." });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ success: false, message: "Ervenytelen ID formatum." });
            }

            const zone = await this.repo.findById(id);
            if (!zone) return res.status(404).json({ success: false, message: "Zona nem talalhato" });
            res.json(zone);
        } catch (err: any) {
            res.status(500).json({ success: false, message: "Nem sikerult a zona lekerdezese." });
        }
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
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
}