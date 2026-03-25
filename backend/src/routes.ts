import { Router} from 'express';
import reservationRoutes from "./api/routes/reservation.routes.js";
import authRoutes from "./api/routes/auth.routes.js";
import userRoutes from "./api/routes/user.routes.js";
import parkingZoneRoutes from "./api/routes/parking-zone.routes.js";
import ParkingSpotRoutes from "./api/routes/parking-spot.routes.js";

const router: Router = Router();

router.use('/reservation', reservationRoutes)
router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/parking-zone', parkingZoneRoutes);
router.use('/parking-spot', ParkingSpotRoutes);
export default router;
