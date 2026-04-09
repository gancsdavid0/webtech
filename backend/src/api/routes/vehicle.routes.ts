// src/modules/vehicle/vehicle.routes.ts
import { Router } from 'express';
import {VehicleRepository} from "../../infrastructure/repositories/vehicle.repository.js";
import {VehicleHandler} from "../../application/Vehicle/handlers/vehicle.handler.js";
import {VehicleController} from "../controllers/vehicle.controller.js";
import {authenticate} from "../middlewares/auth.middleware.js";
import type { Request, Response } from 'express';

const routes = Router();
const vehicleRepo = new VehicleRepository();
const vehicleHandler = new VehicleHandler(vehicleRepo);
const controller = new VehicleController(vehicleHandler);

routes.post('/', authenticate, (req: Request, res: Response) => controller.create(req, res));

routes.get('/owner/:ownerId', authenticate, (req: Request, res: Response) => controller.listByOwner(req, res));

routes.patch('/:id', authenticate, (req: Request, res: Response) => controller.update(req, res));

routes.delete('/:id', authenticate, (req: Request, res: Response) => controller.delete(req, res));

export default routes;