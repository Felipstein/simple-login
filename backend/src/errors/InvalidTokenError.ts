import { APIError } from './APIError';

export class InvalidTokenError extends APIError {

  constructor() {
    super(401, 'Token inválido');
  }

}
