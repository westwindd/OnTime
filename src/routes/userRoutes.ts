import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

router.post('/', (req: Request, res: Response) => {
  userController.createUser(req, res);
});

router.put('/:id', (req: Request, res: Response) => {
  userController.updateUser(req, res);
});

router.delete('/:id', (req: Request, res: Response) => {
  userController.deleteUser(req, res);
});

router.post('/invite', (req: Request, res: Response) => {
  userController.inviteUser(req, res);
});

export default router;
