import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import type { Request, Response } from 'express';

const routes = Router();
const controller = new UserController();

routes.get('/', authenticate, authorize(['ADMIN', 'RECEPTION']), (req: Request, res: Response) => controller.getAll(req, res));

routes.get('/:id', authenticate, (req: Request, res: Response) => controller.getById(req, res));

routes.patch('/:id', authenticate, (req: Request, res: Response) => controller.update(req, res));

routes.delete('/:id', authenticate, authorize(['ADMIN', 'RECEPTION']), (req: Request, res: Response) => controller.delete(req, res));

routes.patch('/:id/role', authenticate, authorize(['ADMIN', 'RECEPTION']),(req: Request, res: Response) => controller.changeRole(req, res));
export default routes;