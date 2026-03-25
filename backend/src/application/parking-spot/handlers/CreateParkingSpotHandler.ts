import { ParkingSpotRepository } from '../../../infrastructure/repositories/parking-spot.repository.js';
import { ParkingZoneRepository } from '../../../infrastructure/repositories/parking-zone.repository.js';
import type { CreateParkingSpotInput } from '../../../domain/dtos/parking-spot.dto.js';

export class CreateParkingSpotHandler {
    private spotRepo = new ParkingSpotRepository();
    private zoneRepo = new ParkingZoneRepository();

    async handle(data: CreateParkingSpotInput) {
        const zone = await this.zoneRepo.findById(data.parkingZoneId);
        if (!zone) {
            throw new Error("A megadott parkoló zóna nem létezik.");
        }

        const existingSpot = await this.spotRepo.findByNumberInZone(data.parkingZoneId, data.spotNumber);
        if (existingSpot) {
            throw new Error(`Ebben a zónában már létezik '${data.spotNumber}' azonosítójú hely.`);
        }

        return await this.spotRepo.create(data);
    }
}