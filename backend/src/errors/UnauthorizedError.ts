import { APIError } from './APIError';

export class UnauthorizedError extends APIError {

  constructor(message?: string) {
    super(401, message || 'Acesso não autorizado');
  }

}
