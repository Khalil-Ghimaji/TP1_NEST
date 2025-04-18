// Dans auth.middleware.ts
import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';


export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // if (!req.originalUrl.startsWith('/v2')) {
    //   return next(); // Ignorer si ce n’est pas la version 2
    // }

    const token = req.headers['auth-user'];

    if (!token || typeof token !== 'string') {
      return res.status(401).json({ message: 'Token manquant' });
    }

    try {
      const decoded: any = jwt.verify(token, 'lkjglkasnlkvjlkahflkjlknvlkajdflkljflafhlinvlkhf');
      if (!decoded.userId) {
        return res.status(401).json({ message: 'userId manquant dans le token' });
      }
      req['user'] = { id: decoded.userId };
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token invalide' });
    }
  }
}
