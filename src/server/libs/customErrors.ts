import { ValidationError } from 'yup';

export class HTTPNotAuthorizedError extends Error {
  statusCode: number;

  constructor(message = 'You are not authorized') {
    super(message);
    this.name = 'NotAuthorizedError';
    this.statusCode = 401;
  }

  getError() {
    return {
      status: this.statusCode,
      message: this.message
    };
  }
}

export class PayloadError extends ValidationError {
  constructor(message: string) {
    super(message);
  }

  static getError(error: ValidationError) {
    return error.inner.map(item => ({ errors: item.errors, field: item.path }));
  }
}
