import { Api, HttpCodes } from './Api';

export interface ErrorBody {
  code: number;
  message: string;
}

export class HttpError extends Error {
  constructor(public code: number, public message: string) {
    super(message);
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(HttpCodes.BAD_REQUEST_ERROR_CODE, message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(HttpCodes.UNAUTHORIZED_ERROR_CODE, message);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(HttpCodes.FORBIDDEN_ERROR_CODE, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(HttpCodes.NOT_FOUND_ERROR_CODE, message);
  }
}
