import type { ParkingZone } from '@prisma/client';
import type { CreateParkingZoneInput } from '../dtos/parking-zone.dto.js';

export interface IParkingZoneRepository {
    create(data: CreateParkingZoneInput): Promise<ParkingZone>;
    findAll(): Promise<ParkingZone[]>;
    findById(id: number): Promise<ParkingZone | null>;

    findByName(name: string): Promise<ParkingZone | null>;
    findByAddress(address: string): Promise<ParkingZone | null>;

    update(id: number, data: Partial<CreateParkingZoneInput>): Promise<ParkingZone>;
    delete(id: number): Promise<void>;
}