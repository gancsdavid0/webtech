import { Router } from 'express';
import { ParkingZoneController } from '../controllers/parking-zone.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const routes = Router();
const controller = new ParkingZoneController();

routes.get('/', (req, res) => controller.getAll(req, res));
routes.get('/:id', (req, res) => controller.getById(req, res));
routes.delete('/:id', authenticate, authorize(['ADMIN']), (req, res) => controller.delete(req, res));
routes.post('/', authenticate, authorize(['ADMIN']), (req, res) => controller.create(req, res));

export default routes;