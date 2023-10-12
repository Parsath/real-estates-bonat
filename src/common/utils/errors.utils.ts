import { HttpStatus, HttpException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';

export const throwFormValidationError = (errors: any) => {
  const errorResponse = {
    message: 'Invalid form',
    errors: {
      ...errors,
    },
  };
  throw new HttpException(errorResponse, HttpStatus.BAD_REQUEST);
};

export const throwPopupValidationError = (error: { message: string }) => {
  const errorResponse = {
    message: 'There was an error',

    error: error,
  };
  throw new HttpException(errorResponse, HttpStatus.BAD_REQUEST);
};

export const throwNotFoundPopupValidationError = (error: {
  message: string;
}) => {
  const errorResponse = {
    message: 'There was an error',

    error: error,
  };
  throw new HttpException(errorResponse, HttpStatus.NOT_FOUND);
};

export const throwAuthorizationValidationError = (errors: any) => {
  const errorResponse = {
    message: 'Non autorisé',
    errors: {
      ...errors,
    },
  };
  throw new UnauthorizedException(errorResponse);
};
