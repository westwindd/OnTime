// src/server.ts

import express from 'express';
import roomRoutes from './routes/roomRoutes';
import userRoutes from './routes/userRoutes';
import bookingRoutes from './routes/bookingRoutes';

const app = express();

app.use(express.json());
app.use('/rooms', roomRoutes);
app.use('/users', userRoutes);
app.use('/bookings', bookingRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
