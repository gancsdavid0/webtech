import { Router} from 'express';
import reservationRoutes from "./api/routes/reservation.routes.js";
import authRoutes from "./api/routes/auth.routes.js";

const router: Router = Router();

router.use('/reservation', reservationRoutes)
router.use('/auth', authRoutes)

export default router;
