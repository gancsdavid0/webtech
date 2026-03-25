import {ParkingSpotRepository} from "../../../infrastructure/repositories/parking-spot.repository.js";
import type {UpdateParkingSpotInput} from "../../../domain/dtos/parking-spot.dto.js";

export class UpdateParkingSpotHandler {
    private repo = new ParkingSpotRepository();

    async handle(id: number, data: UpdateParkingSpotInput) {
        const existing = await this.repo.findById(id);
        if (!existing) throw new Error("A parkolóhely nem található.");

        if (data.spotNumber || data.parkingZoneId) {
            const zoneId = data.parkingZoneId ?? existing.parkingZoneId;
            const sNumber = data.spotNumber ?? existing.spotNumber;

            const duplicate = await this.repo.findByNumberInZone(zoneId, sNumber);
            if (duplicate && duplicate.id !== id) {
                throw new Error(`A(z) '${sNumber}' szám már foglalt ebben a zónában.`);
            }
        }

        return await this.repo.update(id, data);
    }
}

