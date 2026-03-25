import { Router } from "express";
import {ReservationController} from "../controllers/reservation.controller.js";
import { authenticate, authorize} from "../middlewares/auth.middleware.js";


const routes = Router();
const controller = new ReservationController();

routes.post('/', authenticate, (req, res) => controller.create(req, res));

routes.get('/active', authenticate, (req, res) => controller.FindAllActiveReservationsByUserId(req, res));

routes.get('/all', authenticate, authorize(['ADMIN']), (req, res) => controller.getAll(req, res));

routes.get('/:id', authenticate, (req, res) => controller.getById(req, res));

routes.patch('/:id', authenticate, (req, res) => controller.update(req, res));

routes.delete('/:id', authenticate, (req, res) => controller.cancel(req, res));

export default routes;