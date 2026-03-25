// src/application/reservation/handlers/GetReservationByIdHandler.ts

import {ReservationRepository} from '../../../infrastructure/repositories/reservation.repository.js';
import {GetReservationByIdQuery} from '../queries/GetReservationByIdQuery.js';

export class GetReservationByIdHandler {
    private repo = new ReservationRepository();

    async handle(query: GetReservationByIdQuery) {
        const { id } = query;

        if (!id) {
            throw new Error("A foglalás azonosítója hiányzik.");
        }

        return await this.repo.findReservationById(id);
    }
}