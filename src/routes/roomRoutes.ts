// src/routes/roomRoutes.ts

import { Router } from 'express';
import { RoomRepository } from '../repositories/RoomRepository';
import { RoomController } from '../controllers/RoomController';

const router = Router();
const roomRepository = new RoomRepository(); // Concrete implementation
const roomController = new RoomController();

router.post('/', (req, res) => roomController.create(req, res));
router.post('/', (req, res) => roomController.create(req, res));
router.put('/:id', (req, res) => roomController.update(req, res));
router.delete('/:id', (req, res) => roomController.delete(req, res));

export default router;
