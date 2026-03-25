// src/application/parking-zone/handlers/CreateParkingZoneHandler.ts

import { ParkingZoneRepository } from '../../../infrastructure/repositories/parking-zone.repository.js';
import type { CreateParkingZoneInput } from '../../../domain/dtos/parking-zone.dto.js';

export class CreateParkingZoneHandler {
    private repo = new ParkingZoneRepository();

    async handle(data: CreateParkingZoneInput) {
        const existingName = await this.repo.findByName(data.name);
        if (existingName) {
            throw new Error(`A(z) '${data.name}' névvel már létezik zóna.`);
        }

        const existingAddress = await this.repo.findByAddress(data.address);
        if (existingAddress) {
            throw new Error(`A megadott címen már regisztráltak egy parkolót.`);
        }

        // 3. Ha minden oké, mentés
        return await this.repo.create(data);
    }
}