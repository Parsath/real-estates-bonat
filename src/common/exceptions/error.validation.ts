import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationException } from './filter.validation';

export const validationPipe = new ValidationPipe({
  skipMissingProperties: false,
  exceptionFactory: (errors: ValidationError[]) => {
    const errMsg = {};
    errors.forEach((err) => {
      errMsg[err.property] = [...Object.values(err.constraints)];
    });
    return new ValidationException(errMsg);
  },
});
