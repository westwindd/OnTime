import { Request, Response, NextFunction } from 'express';

export function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
  const userRole = req.headers['role'];
  if (userRole === 'admin') next();
  else res.status(403).json({ message: 'Access denied' });
}
