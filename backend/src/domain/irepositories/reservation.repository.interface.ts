import type { Reservation, ReservationStatus } from '@prisma/client';

export interface CreateReservationData {
    userId: number;
    spotId: number;
    vehicleId: number;
    startTime: Date;
    endTime: Date;
    totalPrice: number;
}

export interface IReservationRepository {
    create(data: CreateReservationData): Promise<Reservation>;

    findOverLapping(spotId: number, start: Date, end: Date): Promise<Reservation | null>;

    findReservationById(id: number): Promise<Reservation | null>;

    findAllReservationsByUserId(userId: number): Promise<Reservation[]>;

    findAllActiveReservationsByUserId(userId: number): Promise<Reservation[]>;

    findAll(): Promise<Reservation[]>;

    update(id: number, data: Partial<CreateReservationData>): Promise<Reservation>;

    updateStatus(id: number, status: ReservationStatus): Promise<Reservation>;
}