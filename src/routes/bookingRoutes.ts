// src/routes/bookingRoutes.ts

import { Router } from 'express';
import { BookingController } from '../controllers/BookingController';

const router = Router();
const bookingController = new BookingController();

router.post('/', bookingController.createBooking);
router.delete('/:id', bookingController.deleteBooking);
router.get('/room/:roomId', bookingController.getBookingsByRoom);

export default router;
