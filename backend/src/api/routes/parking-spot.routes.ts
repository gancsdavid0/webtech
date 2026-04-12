import { Router } from 'express';
import { ParkingSpotController } from '../controllers/parking-spot.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import type { Request, Response } from 'express';

const routes = Router();
const controller = new ParkingSpotController();
routes.get('/', (req: Request, res: Response) => controller.getAll(req, res));
routes.get('/:id', (req: Request, res: Response) => controller.getById(req, res));

routes.post('/', authenticate, authorize(['ADMIN', 'RECEPTION']), (req: Request, res: Response) => controller.create(req, res));
routes.patch('/:id', authenticate, authorize(['ADMIN', 'RECEPTION']), (req: Request, res: Response) => controller.update(req, res));
routes.delete('/:id', authenticate, authorize(['ADMIN', 'RECEPTION']), (req: Request, res: Response) => controller.delete(req, res));

export default routes;