import { prisma } from '../database/prisma.js';
import type { ParkingZone } from '@prisma/client';
import type { IParkingZoneRepository } from '../../domain/irepositories/parking-zone.repository.interface.js';
import type { CreateParkingZoneInput } from '../../domain/dtos/parking-zone.dto.js';

export class ParkingZoneRepository implements IParkingZoneRepository {
    async findByName(name: string): Promise<ParkingZone | null> {
        return prisma.parkingZone.findFirst({
            where: { name: { equals: name, mode: 'insensitive' } }
        });
    }

    async findByAddress(address: string): Promise<ParkingZone | null> {
        return prisma.parkingZone.findFirst({
            where: { address: { equals: address, mode: 'insensitive' } }
        });
    }

    async create(data: CreateParkingZoneInput): Promise<ParkingZone> {
        return prisma.parkingZone.create({ data });
    }

    async findAll(): Promise<ParkingZone[]> {
        return prisma.parkingZone.findMany({
            include: { _count: { select: { spots: true } } }
        });
    }

    async findById(id: number): Promise<ParkingZone | null> {
        return prisma.parkingZone.findUnique({
            where: { id },
            include: { spots: true, prices: true }
        });
    }

    async update(id: number, data: Partial<CreateParkingZoneInput>): Promise<ParkingZone> {
        return prisma.parkingZone.update({ where: { id }, data });
    }

    async delete(id: number): Promise<void> {
        await prisma.parkingZone.delete({ where: { id } });
    }
}