import type {CancelReservationCommand} from "../commands/CancelReservationCommand.js";
import {prisma} from "../../../infrastructure/database/prisma.js";
import {ReservationStatus} from "@prisma/client";

export class CancelReservationHandler {
    async handle(command: CancelReservationCommand) {
        return await prisma.reservation.update({
            where: { id: command.id },
            data: { status: ReservationStatus.CANCELLED } // Vagy amilyen enumod van
        });
    }
}