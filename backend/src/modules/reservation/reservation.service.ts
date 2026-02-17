import { ReservationRepository } from "./reservation.repository.js";

export class ReservationService {
    private repo = new ReservationRepository();

    async createReservation(userId: number, data: any){
        const start = new Date(data.startTime)
        const end = new Date(data.endTime)

        if (start >= end){
            throw new Error("A kezdés nem lehet később, mint a befejezés.");
        }

        const overlap = await this.repo.findOverLapping(data.spotId, start, end)
        if (overlap){
            throw new Error("Ez a hely ebben az időpontban már foglalt.")
        }

        return await this.repo.create(userId, data.spotId, start, end)
    }
}