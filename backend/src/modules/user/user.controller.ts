import type {Request, Response} from "express";
import { UserService } from "./user.service.js";
import {RegisterSchema, LoginSchema} from "./user.dto.js";
import { z } from "zod";

export class UserController {
    private service = new UserService();

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
}