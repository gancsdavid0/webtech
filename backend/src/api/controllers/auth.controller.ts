import type {Request, Response} from "express";
import { LoginHandler } from '../../application/handlers/LoginHandler.js';
import { RegisterHandler } from '../../application/handlers/RegisterHandler.js';
import { LogoutHandler } from '../../application/handlers/LogoutHandler.js';
import { z } from "zod";

export class AuthController {
    private loginHandler = new LoginHandler();
    private registerHandler = new RegisterHandler();
    private logoutHandler = new LogoutHandler();

    async register(req: any, res: any) {
        try {
            const result = await this.registerHandler.handle(req.body);
            res.status(201).json(result);
        } catch (error: any) {
            this.handleError(res, error);
        }
    }

    async login(req: Request, res: Response) {
        try {
            const result = await this.loginHandler.handle(req.body);
            res.json(result);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async logout(req: any, res: any) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            const result = await this.logoutHandler.handle({ token });
            res.json(result);
        } catch (error: any) {
            this.handleError(res, error);
        }
    }

    private handleError(res: any, error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validációs hiba",
                errors: error.issues.map(i => ({ path: i.path, message: i.message }))
            });
        }
        const errorMessage = error instanceof Error ? error.message : 'Ismeretlen hiba történt';
        res.status(401).json({ success: false, message: errorMessage });
    }
}