import bcrypt from 'bcrypt';
import { AuthRepository } from '../../infrastructure/repositories/auth.repository.js';
import { RegisterSchema } from '../../domain/dtos/auth.dto.js';

export class RegisterHandler {
    private repo = new AuthRepository();

    async handle(rawData: unknown) {
        const data = RegisterSchema.parse(rawData);

        const existingUser = await this.repo.findByEmail(data.email);
        if (existingUser) throw new Error("Ez az email már foglalt.");

        const hashedPassword = await bcrypt.hash(data.password, 10);

        return await this.repo.create({
            email: data.email,
            passwordHash: hashedPassword,
            fullName: data.fullName
        });
    }
}