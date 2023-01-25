import { NextFunction, Request, Response } from 'express';
import { APIError } from '../errors/APIError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorsHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  if(error instanceof APIError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.warn('#### ERROR HANDLER ####');
  console.error(error);
  console.warn('#### ERROR HANDLER ####');
  return res.status(500).json({ message: 'Ocorreu um erro desconhecido interno nos nossos servidores' });
}
