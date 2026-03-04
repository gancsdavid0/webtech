import { ReservationRepository } from '../../infrastructure/repositories/reservation.repository.js';
import { prisma } from '../../infrastructure/database/prisma.js';

export class CreateReservationHandler {
    private repo = new ReservationRepository();

    async handle(command: any) {
        const { userId, spotId, startTime, endTime } = command;
        const start = new Date(startTime);
        const end = new Date(endTime);

        const overlapping = await this.repo.findOverLapping(spotId, start, end);
        if (overlapping) throw new Error("A hely már foglalt!");

        const spot = await prisma.parkingSpot.findUnique({
            where: { id: spotId },
            include: { parkingHouse: { include: { prices: true } } }
        });
        if (!spot) throw new Error("A parkolóhely nem létezik.");

        const pricing = spot.parkingHouse.prices.find(p => p.spotType === spot.type);
        if (!pricing) throw new Error("Nincs ár meghatározva ehhez a típushoz.");

        const diffInMs = end.getTime() - start.getTime();
        const hours = diffInMs / (1000 * 60 * 60);
        const totalPrice = Math.ceil(hours) * pricing.pricePerHour;

        return await this.repo.create({
            userId,
            spotId,
            start,
            end,
            totalPrice
        });
    }
}