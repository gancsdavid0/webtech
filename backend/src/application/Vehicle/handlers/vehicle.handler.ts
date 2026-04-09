import type {IVehicleRepository} from "../../../domain/irepositories/vehicle.repository.interface.js";
import type {CreateVehicleDto, UpdateVehicleDto} from "../../../domain/dtos/vehicle.dto.js";

// src/modules/vehicle/vehicle.handler.ts
export class VehicleHandler {
    constructor(private vehicleRepo: IVehicleRepository) {}

    async createVehicle(currentUserId: number, data: CreateVehicleDto) {
        if (data.ownerId !== currentUserId) {
            throw new Error('Nincs jogosultságod más nevére járművet regisztrálni!');
        }

        const existing = await this.vehicleRepo.findByLicensePlate(data.licensePlate);
        if (existing) throw new Error('Ez a rendszám már foglalt.');

        return await this.vehicleRepo.create(data);
    }

    async getOwnerVehicles(currentUserId: number, ownerId: number, userRole: string) {
        if (currentUserId !== ownerId && userRole !== 'ADMIN') {
            throw new Error('Nincs jogosultságod más felhasználó járműveit megtekinteni!');
        }
        return await this.vehicleRepo.findAllByOwnerId(ownerId);
    }

    async updateVehicle(id: number, currentUserId: number, data: UpdateVehicleDto) {
        const vehicle = await this.vehicleRepo.findById(id);
        if (!vehicle) throw new Error('Jármű nem található');

        if (vehicle.ownerId !== currentUserId) {
            throw new Error('Ez nem a te autód, nem módosíthatod!');
        }

        return await this.vehicleRepo.update(id, data);
    }

    async deleteVehicle(id: number, currentUserId: number) {
        const vehicle = await this.vehicleRepo.findById(id);
        if (!vehicle) throw new Error('Jármű nem található');

        if (vehicle.ownerId !== currentUserId) {
            throw new Error('Nincs jogosultságod a törléshez!');
        }

        return await this.vehicleRepo.delete(id);
    }
}