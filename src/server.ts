import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import roomRoutes from './routes/roomRoutes';
import { authorizeAdmin } from './middlewares/authMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/rooms', authorizeAdmin, roomRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
