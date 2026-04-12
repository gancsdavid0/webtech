import { Router } from "express";
import {ReservationController} from "../controllers/reservation.controller.js";
import { authenticate, authorize} from "../middlewares/auth.middleware.js";
import type { Request, Response } from 'express';


const routes = Router();
const controller = new ReservationController();

routes.post('/', authenticate, (req: Request, res: Response) => controller.create(req, res));

routes.get('/active', authenticate, (req: Request, res: Response) => controller.FindAllActiveReservationsByUserId(req, res));

routes.get('/all', authenticate, authorize(['ADMIN', 'RECEPTION']), (req: Request, res: Response) => controller.getAll(req, res));

routes.get('/:id', authenticate, (req: Request, res: Response) => controller.getById(req, res));

routes.patch('/:id', authenticate, (req: Request, res: Response) => controller.update(req, res));

routes.delete('/:id', authenticate, (req: Request, res: Response) => controller.cancel(req, res));

export default routes;