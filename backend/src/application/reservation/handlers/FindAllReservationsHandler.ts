import { ReservationRepository } from '../../../infrastructure/repositories/reservation.repository.js';
import { FindAllReservationsQuery } from '../queries/FindAllReservationsQuery.js';

export class FindAllReservationsHandler {
    private repo = new ReservationRepository();

    async handle(query: FindAllReservationsQuery) {
        return await this.repo.findAll();
    }
}