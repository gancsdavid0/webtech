import type { Vehicle } from '@prisma/client';
import type  { CreateVehicleDto, UpdateVehicleDto } from '../dtos/vehicle.dto.js';

export interface IVehicleRepository {
    create(data: CreateVehicleDto): Promise<Vehicle>;
    findAllByOwnerId(ownerId: number): Promise<Vehicle[]>;
    findById(id: number): Promise<Vehicle | null>;
    findByLicensePlate(plate: string): Promise<Vehicle | null>;
    update(id: number, data: UpdateVehicleDto): Promise<Vehicle>;
    delete(id: number): Promise<void>;
}