import { ValidationError } from 'yup';

export class PayloadError extends ValidationError {
  constructor(message: string) {
    super(message);
  }

  static getError(error: ValidationError) {
    return error.inner.map(item => ({ errors: item.errors, field: item.path }));
  }
}
