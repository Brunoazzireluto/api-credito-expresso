import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../configs/auth';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export class Middleware { 

  isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const authHeader = request.headers.authorization;
  
    if (!authHeader) {
      return response.status(401).json({ error: 'Token JWT não encontrado' });
    }
  
    const [, token] = authHeader.split(' ');
  
    try {
      const decoded = verify(token, authConfig.jwt.secret);
  
      const { sub } = decoded as TokenPayload;
  
      request.user = {
        id: sub,
      };
  
      return next();
    } catch {
      throw new Error('Token JWT Inválido');
    }
  }
  
}

