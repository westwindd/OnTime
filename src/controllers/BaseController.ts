// src/controllers/BaseController.ts
import { Request, Response } from 'express';

export interface BaseController {
  create(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
}
