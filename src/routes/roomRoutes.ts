import { Router, Request, Response } from 'express';
import { RoomController } from '../controllers/RoomController';
import { RoomRepository } from '../repositories/RoomRepository';

const router = Router(); 
const roomRepository = new RoomRepository();
const roomController = new RoomController(roomRepository); 

router.post('/', (req: Request, res: Response) => {
  roomController.create(req, res);
});

router.put('/:id', (req: Request, res: Response) => {
  roomController.update(req, res);
});

router.delete('/:id', (req: Request, res: Response) => {
  roomController.delete(req, res);
});

export default router;
