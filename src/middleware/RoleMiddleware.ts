import { Request, Response, NextFunction } from 'express';
const jwt =require('jsonwebtoken');

export const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).send('Access denied.');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      if (!roles.includes((decoded as any).role)) {
        return res.status(403).send('Access denied.');
      }
      next();
    } catch (error) {
      res.status(400).send('Invalid token.');
    }
  };
};
