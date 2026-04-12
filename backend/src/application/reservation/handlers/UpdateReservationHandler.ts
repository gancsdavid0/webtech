import {ReservationRepository} from "../../../infrastructure/repositories/reservation.repository.js";
import type {UpdateReservationCommand} from "../commands/UpdateReservationCommand.js";
import {prisma} from "../../../infrastructure/database/prisma.js";
import {ReservationStatus} from "@prisma/client";

export class UpdateReservationHandler {
    private repo = new ReservationRepository();

    async handle(command: UpdateReservationCommand) {
        const existing = await this.repo.findReservationById(command.id);
        if (!existing) throw new Error("Foglalás nem található.");

        const start = command.startTime ?? existing.startTime;
        const end = command.endTime ?? existing.endTime;

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new Error("Érvénytelen dátum formátum!");
        }

        if (start >= end) {
            throw new Error("A foglalás kezdete korábbi kell legyen a befejezésnél.");
        }

        const overlap = await prisma.reservation.findFirst({
            where: {
                spotId: existing.spotId,
                status: ReservationStatus.ACTIVE,
                id: { not: command.id },
                OR: [{ startTime: { lt: end }, endTime: { gt: start } }]
            }
        });

        if (overlap) throw new Error("Az új időpont ütközik egy másik foglalással!");

        return await prisma.reservation.update({
            where: { id: command.id },
            data: { startTime: start, endTime: end }
        });
    }
}