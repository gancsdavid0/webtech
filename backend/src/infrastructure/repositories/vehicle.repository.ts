// src/repositories/prisma/VehicleRepository.ts
import { PrismaClient, type Vehicle } from '@prisma/client';
import type {IVehicleRepository} from "../../domain/irepositories/vehicle.repository.interface.js";
import type {CreateVehicleDto, UpdateVehicleDto} from "../../domain/dtos/vehicle.dto.js";

export class VehicleRepository implements IVehicleRepository {
    private prisma = new PrismaClient();

    async create(data: CreateVehicleDto): Promise<Vehicle> {
        return this.prisma.vehicle.create({ data });
    }

    async findAllByOwnerId(ownerId: number): Promise<Vehicle[]> {
        return this.prisma.vehicle.findMany({ where: { ownerId } });
    }

    async findById(id: number): Promise<Vehicle | null> {
        return this.prisma.vehicle.findUnique({ where: { id } });
    }

    async findByLicensePlate(plate: string): Promise<Vehicle | null> {
        return this.prisma.vehicle.findUnique({ where: { licensePlate: plate } });
    }

    async update(id: number, data: UpdateVehicleDto): Promise<Vehicle> {
        return this.prisma.vehicle.update({ where: { id }, data });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.vehicle.delete({ where: { id } });
    }
}