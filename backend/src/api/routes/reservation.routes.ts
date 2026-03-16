import { Router } from "express";
import type { Request, Response } from "express";
import {ReservationController} from "../controllers/reservation.controller.js";
import { authenticate, authorize} from "../middlewares/auth.middleware.js";
import {
    FindAllActiveReservationsByUserIdHandler
} from "../../application/reservation/handlers/findAllActiveReservationsByUserIdHandler.js";

const routes: Router = Router();

const controller = new ReservationController();

routes.post('/', authenticate, (req: Request,res: Response) => controller.create(req,res))
routes.get('/active-reservations/:userId', authenticate, (req: Request, res: Response) => controller.FindAllActiveReservationsByUserId(req,res))
export default routes;