import {ParkingSpotRepository} from "../../../infrastructure/repositories/parking-spot.repository.js";

export class DeleteParkingSpotHandler {
    private repo = new ParkingSpotRepository();
    async handle(id: number) {
        const existing = await this.repo.findById(id);
        if (!existing) throw new Error("A parkolóhely nem létezik.");
        return await this.repo.delete(id);
    }
}