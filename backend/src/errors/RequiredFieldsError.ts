import { APIError } from './APIError';

export class RequiredFieldsError extends APIError {

  constructor() {
    super(400, 'Preencha todos os campos obrigatórios');
  }

}
