import { Router } from "express";
import type { Request, Response } from "express";
import {ReservationController} from "./reservation.controller.js";
import { authenticate, authorize} from "../../common/middlewares/auth.js";

const routes: Router = Router();

const controller = new ReservationController();

routes.post('/', authenticate, (req: Request,res: Response) => controller.handleCreateReservation(req,res))

export default routes;