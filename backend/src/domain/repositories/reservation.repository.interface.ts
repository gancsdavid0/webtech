import type { Reservation } from '@prisma/client';

// Definíció a létrehozáshoz szükséges adatokhoz
export interface CreateReservationData {
    userId: number;
    spotId: number;
    startTime: Date;
    endTime: Date;
    totalPrice: number;
}

export interface IReservationRepository {
    /**
     * Új foglalás létrehozása.
     */
    create(data: CreateReservationData): Promise<Reservation>;

    /**
     * Ellenőrzi, hogy van-e átfedő foglalás az adott helyen az adott időpontban.
     */
    findOverLapping(spotId: number, start: Date, end: Date): Promise<Reservation | null>;

    /**
     * Egy adott felhasználó összes foglalásának lekérése.
     */
    findAllByUserId(userId: number): Promise<Reservation[]>;

    /**
     * Foglalás keresése ID alapján.
     */
    findById(id: number): Promise<Reservation | null>;
}