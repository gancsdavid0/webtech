import { Router } from "express";
import type { Request, Response } from "express";
import {ReservationController} from "../controllers/reservation.controller.js";
import { authenticate, authorize} from "../middlewares/auth.middleware.js";

const routes: Router = Router();

const controller = new ReservationController();

routes.post('/', authenticate, (req: Request,res: Response) => controller.create(req,res))

export default routes;