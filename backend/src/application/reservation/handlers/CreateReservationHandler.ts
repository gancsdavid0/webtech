import { ReservationRepository } from '../../../infrastructure/repositories/reservation.repository.js';
import { prisma } from '../../../infrastructure/database/prisma.js';
import type {CreateReservationCommand} from "../commands/CreateReservationCommand.js";

export class CreateReservationHandler {
    private repo = new ReservationRepository();

    async handle(command: CreateReservationCommand) {
        const { userId, spotId, vehicleId, startTime, endTime } = command;

        if (!userId) throw new Error("A foglaláshoz be kell jelentkezni.");

        const start = new Date(startTime);
        const end = new Date(endTime);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new Error("Érvénytelen dátum formátum! Kérlek, használj ISO formátumot (pl. 2026-03-10T10:00:00Z).");
        }

        if (start >= end) {
            throw new Error("A foglalás kezdete korábbi kell legyen a befejezésnél.");
        }

        const spot = await prisma.parkingSpot.findUnique({
            where: { id: spotId },
            include: { parkingZone: { include: { prices: true } } }
        });

        if (!spot) throw new Error("A parkolóhely nem létezik.");
        if (!spot.isActive) throw new Error("A parkolóhely jelenleg nem aktív.");

        const overlapping = await this.repo.findOverLapping(spotId, start, end);
        if (overlapping) throw new Error("A hely már foglalt!");

        if (vehicleId) {
            const vehicle = await prisma.vehicle.findUnique({
                where: { id: vehicleId }
            });

            if (!vehicle) throw new Error("A megadott jármű nem található.");
            if (vehicle.ownerId !== userId) throw new Error("Ez a jármű nem a te neveden van!");
        }

        const pricing = spot.parkingZone.prices.find(p => p.spotType === spot.type);
        if (!pricing) throw new Error("Nincs ár meghatározva ehhez a típushoz.");

        const diffInMs = end.getTime() - start.getTime();
        const hours = diffInMs / (1000 * 60 * 60);
        const totalPrice = Math.ceil(hours) * pricing.pricePerHour;

        return await this.repo.create({
            userId,
            spotId,
            startTime: start,
            endTime: end,
            totalPrice,
            vehicleId: vehicleId,
        });
    }
}