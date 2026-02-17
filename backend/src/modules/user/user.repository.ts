import {prisma} from "../../common/database/prisma.js";
import type {RegisterDto} from "./user.dto.js";

export class UserRepository {
    async create(data: RegisterDto & {passwordHash: string}) {
        return prisma.user.create({
            data: {
                email: data.email,
                password: data.passwordHash,
                fullName: data.fullName,
            }
        })
    }

    async findByEmail(email: string) {
        return prisma.user.findUnique({where: {email}})
    }
}