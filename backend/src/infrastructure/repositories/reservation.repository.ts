import {prisma} from "../database/prisma.js";
import type { IReservationRepository, CreateReservationData } from '../../domain/repositories/reservation.repository.interface.js';
import type { Reservation } from "@prisma/client";

export class ReservationRepository implements IReservationRepository {
    findAllByUserId(userId: number): Promise<Reservation[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Reservation | null> {
        throw new Error("Method not implemented.");
    }
    async create(data: CreateReservationData) {
        return prisma.reservation.create({
            data: {
                userId: data.userId,
                spotId: data.spotId,
                startTime: data.startTime,
                endTime: data.endTime,
                totalPrice: data.totalPrice,
                status: 'ACTIVE'
            }
        });
    }

    async findOverLapping(spotId:number, start:Date, end:Date) {
        return prisma.reservation.findFirst({
            where: {
                spotId: spotId,
                status: "ACTIVE",
                OR: [
                    {
                    startTime: {lt:end},
                    endTime: {gt:start},
                    }
                ]
            }
        })
    }
}