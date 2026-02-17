import type {Request, Response} from "express";
import { AuthService } from "./auth.service.js";
import {RegisterSchema, LoginSchema} from "./auth.dto.js";
import { z } from "zod";

export class AuthController {
    private service = new AuthService();

    async register(req: Request, res: Response){
        try {
            const validatedData = await RegisterSchema.parse(req.body);
            const user = await this.service.register(validatedData);
            res.status(201).json({succes: true, data: user})
        }catch(err){
            if (err instanceof z.ZodError) {
                return res.status(400).json({
                    success: false,
                    message: "Validációs hiba",
                    errors: err.issues.map(e => ({ path: e.path, message: e.message }))
                });
            }

            const errorMessage = err instanceof Error ? err.message : 'Ismeretlen hiba történt';
            return res.status(400).json({ success: false, message: errorMessage });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const validatedData = await LoginSchema.parseAsync(req.body);
            const result = await this.service.login(validatedData);

            return res.status(200).json({ success: true, ...result });
        } catch (err) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({
                    success: false,
                    message: "Validációs hiba",
                    errors: err.issues.map(i => ({ path: i.path, message: i.message }))
                });
            }

            const errorMessage = err instanceof Error ? err.message : 'Ismeretlen hiba történt';
            return res.status(401).json({ success: false, message: errorMessage });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            return res.status(200).json({
                success: true,
                message: "Sikeres kijelentkezés. Ne felejtsd el törölni a tokent a kliens oldalon!"
            });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Hiba a kijelentkezés során';
            return res.status(500).json({ success: false, message: errorMessage });
        }
    }
}