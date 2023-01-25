export class APIError extends Error {

  readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'APIError';

    this.statusCode = statusCode;
  }

}
