import { Router} from 'express';
import reservationRoutes from "./modules/reservation/reservation.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";

const router: Router = Router();

router.use('/reservation', reservationRoutes)
router.use('/auth', authRoutes)

export default router;
