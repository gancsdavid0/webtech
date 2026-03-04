import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRepository } from '../../infrastructure/repositories/auth.repository.js';
import { LoginSchema } from '../../domain/dtos/auth.dto.js';

export class LoginHandler {
    private repo = new AuthRepository();

    async handle(rawData: any) {
        const validatedData = LoginSchema.parse(rawData);

        const user = await this.repo.findByEmail(validatedData.email);
        if (!user) throw new Error("Hibás email vagy jelszó.");

        const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
        if (!isPasswordValid) throw new Error("Hibás email vagy jelszó.");

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '1d' }
        );

        return { token, user: { id: user.id, email: user.email, fullName: user.fullName } };
    }
}