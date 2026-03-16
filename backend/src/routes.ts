import { Router} from 'express';
import reservationRoutes from "./api/routes/reservation.routes.js";
import authRoutes from "./api/routes/auth.routes.js";
import userRoutes from "./api/routes/user.routes.js";

const router: Router = Router();

router.use('/reservation', reservationRoutes)
router.use('/auth', authRoutes)
router.use('/user', userRoutes)

export default router;
