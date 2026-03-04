import { Router } from 'express';
import type { Request, Response } from 'express';
import {AuthController} from "../controllers/auth.controller.js";
import {authenticate} from "../middlewares/auth.middleware.js";

const router: Router = Router();

const authController = new AuthController();

router.post('/register', (req: Request, res: Response)=> authController.register(req,res));
router.post('/login', (req: Request, res: Response) => authController.login(req, res));

router.post('/logout',authenticate ,(req: Request, res: Response) => authController.logout(req, res));

export default router;