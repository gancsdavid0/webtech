import { Router } from 'express';
import type { Request, Response } from 'express';
import {UserController} from "./user.controller.js";

const router: Router = Router();

const authController = new UserController();

router.post('/register', (req: Request, res: Response)=> authController.register(req,res));
router.post('/login', (req: Request, res: Response) => authController.login(req, res));

export default router;