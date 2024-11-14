import { Router, Request, Response } from 'express';
import { RoomController } from '../controllers/RoomController';

const router = Router();
const roomController = new RoomController();

router.post('/', (req: Request, res: Response) => {
  roomController.createRoom(req, res);
});

router.put('/:id', (req: Request, res: Response) => {
  roomController.updateRoom(req, res);
});

router.delete('/:id', (req: Request, res: Response) => {
  roomController.deleteRoom(req, res);
});

export default router;
