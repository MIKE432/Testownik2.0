import { Response } from 'express';
import { ErrorBody, HttpError } from './Errors';

export enum HttpCodes {
  OK_CODE = 200,
  CREATED_CODE = 201,
  NO_CONTENT_CODE = 204,
  INTERNAL_SERVER_ERROR_CODE = 500,
  BAD_REQUEST_ERROR_CODE = 400,
  UNAUTHORIZED_ERROR_CODE = 401,
  FORBIDDEN_ERROR_CODE = 403,
  NOT_FOUND_ERROR_CODE = 404,
}

export class Api {
  public static INTERNAL_SERVER_ERROR_MSG = 'Internal server error.';

  public static async handleRequest<BodyType, ReturnType>(
    response: Response,
    fn: () => Promise<ReturnType>,
  ) {
    try {
      return await fn();
    } catch (e) {
      if (e instanceof HttpError) {
        const errorBody: ErrorBody = { code: e.code, message: e.message };

        return response.status(errorBody.code).send(errorBody);
      }

      return response.status(HttpCodes.INTERNAL_SERVER_ERROR_CODE).send({
        code: 500,
        message: Api.INTERNAL_SERVER_ERROR_MSG,
      });
    }
  }
}
