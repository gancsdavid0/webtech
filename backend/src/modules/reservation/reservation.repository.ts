import {prisma} from "../../common/database/prisma.js";

export class ReservationRepository {
    async create(userId: number, spotId: number, start: Date, end: Date) {
        return prisma.reservation.create({
            data: {
                userId,
                spotId,
                startTime: start,
                endTime: end,
            },
            include: {spot:true}
        })
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