import { APIError } from './APIError';

export class IDNotGivenError extends APIError {

  constructor() {
    super(400, 'ID não informado');
  }

}
