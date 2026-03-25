import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const routes = Router();
const controller = new UserController();

routes.get('/', authenticate, authorize(['ADMIN']), (req, res) => controller.getAll(req, res));

routes.get('/:id', authenticate, (req, res) => controller.getById(req, res));

routes.patch('/:id', authenticate, (req, res) => controller.update(req, res));

routes.delete('/:id', authenticate, authorize(['ADMIN']), (req, res) => controller.delete(req, res));

routes.patch('/:id/role', authenticate, authorize(['ADMIN']),(req, res) => controller.changeRole(req, res));
export default routes;