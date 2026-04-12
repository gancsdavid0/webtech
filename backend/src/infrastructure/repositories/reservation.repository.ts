import {prisma} from "../database/prisma.js";
import type { IReservationRepository, CreateReservationData } from '../../domain/irepositories/reservation.repository.interface.js';
import type { Reservation } from "@prisma/client";
import { ReservationStatus } from "@prisma/client";

export class ReservationRepository implements IReservationRepository {
    private readonly reservationInclude = {
        user: {
            select: {
                fullName: true,
                email: true
            }
        },
        spot: {
            include: {
                parkingZone: true
            }
        },
        vehicle: true
    };

    async update(id: number, data: Partial<CreateReservationData>): Promise<Reservation> {
        return prisma.reservation.update({
            where: { id },
            data
        });
    }

    async updateStatus(id: number, status: ReservationStatus): Promise<Reservation> {
        return prisma.reservation.update({
            where: { id },
            data: { status }
        });
    }
    async findAllReservationsByUserId(userId: number): Promise<Reservation[]> {
        return prisma.reservation.findMany({
            where: {
                userId : userId
            },
        })
    }

    async findReservationById(id: number) {
        return prisma.reservation.findUnique({
            where: { id },
            include: this.reservationInclude
        });
    }

    async findAllActiveReservationsByUserId(userId: number){
        return prisma.reservation.findMany({
            where: {
                userId : userId,
                status : ReservationStatus.ACTIVE
            },
            include: this.reservationInclude
        })
    }

    async create(data: CreateReservationData)  {
        return prisma.reservation.create({
            data: {
                userId: data.userId,
                spotId: data.spotId,
                vehicleId: data.vehicleId,
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
    async findAll(): Promise<Reservation[]> {
        return prisma.reservation.findMany({
            include: this.reservationInclude,
            orderBy: {
                startTime: 'desc'
            }
        });
    }
}
