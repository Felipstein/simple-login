import { NextFunction, Request, Response } from 'express';

import { tokenProvider } from '../providers/TokenProvider';
import { UnauthorizedError } from '../errors/UnauthorizedError';

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if(!authorization) {
    throw new UnauthorizedError();
  }

  const [bearer, token] = authorization.split(' ');
  if(bearer !== 'Bearer') {
    throw new UnauthorizedError();
  }

  if(!token) {
    throw new UnauthorizedError();
  }

  if(!tokenProvider.verify(token)) {
    throw new UnauthorizedError();
  }

  next();
}
