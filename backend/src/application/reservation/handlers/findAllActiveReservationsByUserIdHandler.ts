import {ReservationRepository} from "../../../infrastructure/repositories/reservation.repository.js";
import type {FindAllActiveReservationsByUserIdQuery} from "../queries/findAllActiveReservationsByUserIdQueries.js";

export class FindAllActiveReservationsByUserIdHandler {
    private repo = new ReservationRepository();

    async handle(query: FindAllActiveReservationsByUserIdQuery){
        const { userId } = query;

        if (userId === undefined || userId === null) {
            throw new Error(`User ID nincsen megadva.`);
        }
        return await this.repo.findAllActiveReservationsByUserId(userId);
    }
}