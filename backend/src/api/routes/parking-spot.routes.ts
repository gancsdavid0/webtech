import { Router } from 'express';
import { ParkingSpotController } from '../controllers/parking-spot.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const routes = Router();
const controller = new ParkingSpotController();
routes.get('/', (req, res) => controller.getAll(req, res));
routes.get('/:id', (req, res) => controller.getById(req, res));

routes.post('/', authenticate, authorize(['ADMIN']), (req, res) => controller.create(req, res));
routes.patch('/:id', authenticate, authorize(['ADMIN']), (req, res) => controller.update(req, res));
routes.delete('/:id', authenticate, authorize(['ADMIN']), (req, res) => controller.delete(req, res));

export default routes;