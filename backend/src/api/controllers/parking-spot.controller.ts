import type { Request, Response } from 'express';
import {CreateParkingSpotSchema, UpdateParkingSpotSchema} from '../../domain/dtos/parking-spot.dto.js';
import {CreateParkingSpotHandler} from "../../application/parking-spot/handlers/CreateParkingSpotHandler.js";
import {ParkingSpotRepository} from "../../infrastructure/repositories/parking-spot.repository.js";
import {UpdateParkingSpotHandler} from "../../application/parking-spot/handlers/UpdateParkingSpotHandler.js";
import {DeleteParkingSpotHandler} from "../../application/parking-spot/handlers/DeleteParkingSpotHandler.js";

export class ParkingSpotController {
    private repo = new ParkingSpotRepository();
    private createHandler = new CreateParkingSpotHandler();
    private updateHandler = new UpdateParkingSpotHandler();
    private deleteHandler = new DeleteParkingSpotHandler();

    async getAll(req: any, res: any) {
        try {
            const spots = await this.repo.findAll();
            res.json(spots);
        } catch (e: any) {
            res.status(500).json({ success: false, message: "Nem sikerult a parkolohelyek listazasa." });
        }
    }

    async getById(req: any, res: any) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ success: false, message: "Ervenytelen ID formatum." });
            }

            const spot = await this.repo.findById(id);
            return spot
                ? res.json(spot)
                : res.status(404).json({ success: false, message: "Parkolohely nem talalhato." });
        } catch (e: any) {
            res.status(500).json({ success: false, message: "Nem sikerult a parkolohely lekerdezese." });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const validatedData = CreateParkingSpotSchema.parse(req.body);
            const result = await this.createHandler.handle(validatedData);

            res.status(201).json({
                success: true,
                data: result
            });
        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async update(req: any, res: any) {
        try {
            const data = UpdateParkingSpotSchema.parse(req.body);
            const result = await this.updateHandler.handle(Number(req.params.id), data);
            res.json(result);
        } catch (e: any) {
            res.status(400).json({ success: false, message: e.message });
        }
    }

    async delete(req: any, res: any) {
        try {
            await this.deleteHandler.handle(Number(req.params.id));
            res.json({ message: "Törölve!" });
        } catch (e: any) {
            res.status(400).json({ success: false, message: e.message });
        }
    }
}