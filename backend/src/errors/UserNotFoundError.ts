import { APIError } from './APIError';

export class UserNotFoundError extends APIError {

  constructor() {
    super(404, 'Usuário não encontrado');
  }

}
