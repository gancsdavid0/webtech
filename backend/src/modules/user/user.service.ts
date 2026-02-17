import { UserRepository } from "./user.repository.js";
import type {LoginDto, RegisterDto} from "./user.dto.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
    private repo = new UserRepository();
    private JWT_SECRET = process.env.JWT_SECRET;

    async register(data: RegisterDto){
        const existingUser = await this.repo.findByEmail(data.email);
        if (existingUser) throw new Error("Ez az email már foglalt.");

        const passwordHash = await bcrypt.hash(data.password, 12);
        const user = await this.repo.create({...data, passwordHash});

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async login(data: LoginDto){
        const user = await this.repo.findByEmail(data.email);
        if (!user) throw new Error("Hibás email vagy jelszó.");

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) throw new Error("Hibás email vagy jelszó.");

        if (!this.JWT_SECRET) {
            console.error("HIBA: JWT_SECRET hiányzik a UserService-ből!");
            throw new Error("Szerver konfigurációs hiba.");
        }

        const token = jwt.sign(
            {id: user.id, role: user.role},
            this.JWT_SECRET,
            {expiresIn: "1d"}
        );

        return { token, user: {id: user.id, email: user.email, fullName: user.fullName, role: user.role}}
    }
}