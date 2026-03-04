import { ReservationRepository } from '../../infrastructure/repositories/reservation.repository.js';
import { prisma } from '../../infrastructure/database/prisma.js';
import type {CreateReservationCommand} from "../commands/CreateReservationCommand.js";

export class CreateReservationHandler {
    private repo = new ReservationRepository();

    async handle(command: CreateReservationCommand) {
        const { userId, spotId, startTime, endTime } = command;

        if (!userId) throw new Error("A foglaláshoz be kell jelentkezni.");

        const start = new Date(startTime);
        const end = new Date(endTime);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new Error("Érvénytelen dátum formátum! Kérlek, használj ISO formátumot (pl. 2026-03-10T10:00:00Z).");
        }

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
            startTime: start,
            endTime: end,
            totalPrice
        });
    }
}