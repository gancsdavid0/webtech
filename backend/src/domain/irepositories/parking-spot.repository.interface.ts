import type { ParkingSpot } from '@prisma/client';
import type { CreateParkingSpotInput } from '../dtos/parking-spot.dto.js';

export interface IParkingSpotRepository {
    create(data: CreateParkingSpotInput): Promise<ParkingSpot>;
    findByNumberInZone(zoneId: number, spotNumber: string): Promise<ParkingSpot | null>;
    findAllByZone(zoneId: number): Promise<ParkingSpot[]>;
    findById(id: number): Promise<ParkingSpot | null>;
}