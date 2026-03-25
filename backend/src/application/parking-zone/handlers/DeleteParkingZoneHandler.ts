import { ParkingZoneRepository } from '../../../infrastructure/repositories/parking-zone.repository.js';

export class DeleteParkingZoneHandler {
    private repo = new ParkingZoneRepository();

    async handle(id: number) {
        const zone = await this.repo.findById(id);
        if (!zone) {
            throw new Error("A törölni kívánt parkoló zóna nem található.");
        }

        return await this.repo.delete(id);
    }
}