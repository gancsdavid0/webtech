import { Router} from 'express';
import reservationRoutes from "./modules/reservation/reservation.routes.js";
import authRoutes from "./modules/user/user.routes.js";

const router: Router = Router();

router.use('/reservation', reservationRoutes)
router.use('/user', authRoutes)

export default router;
