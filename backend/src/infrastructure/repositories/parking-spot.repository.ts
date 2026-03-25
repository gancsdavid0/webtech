import { prisma } from '../database/prisma.js';
import type  { ParkingSpot } from '@prisma/client';
import type { IParkingSpotRepository } from '../../domain/irepositories/parking-spot.repository.interface.js';
import type {CreateParkingSpotInput, UpdateParkingSpotInput} from '../../domain/dtos/parking-spot.dto.js';

export class ParkingSpotRepository implements IParkingSpotRepository {
    async create(data: CreateParkingSpotInput): Promise<ParkingSpot> {
        return prisma.parkingSpot.create({ data });
    }

    async findAll() {
        return prisma.parkingSpot.findMany({ include: { parkingZone: true } });
    }

    async update(id: number, data: UpdateParkingSpotInput) {
        //Kiszűrjük az undefined értékeket, hogy a Prisma ne panaszkodjon
        const cleanData = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== undefined)
        );

        return prisma.parkingSpot.update({
            where: { id },
            data: cleanData as any
        });
    }

    async delete(id: number) {
        return prisma.parkingSpot.delete({ where: { id } });
    }

    async findByNumberInZone(zoneId: number, spotNumber: string): Promise<ParkingSpot | null> {
        return prisma.parkingSpot.findFirst({
            where: {
                parkingZoneId: zoneId,
                spotNumber: { equals: spotNumber, mode: 'insensitive' }
            }
        });
    }

    async findAllByZone(zoneId: number): Promise<ParkingSpot[]> {
        return prisma.parkingSpot.findMany({
            where: { parkingZoneId: zoneId },
            include: { parkingZone: true }
        });
    }

    async findById(id: number): Promise<ParkingSpot | null> {
        return prisma.parkingSpot.findUnique({
            where: { id },
            include: { parkingZone: true }
        });
    }
}