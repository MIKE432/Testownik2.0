import { Response } from 'express';
import { ErrorBody, HttpError } from "./Errors";

export class Api {
    public static INTERNAL_SERVER_ERROR_CODE = 500
    public static BAD_REQUEST_ERROR_CODE = 400
    public static UNAUTHORIZED_ERROR_CODE = 401
    public static FORBIDDEN_ERROR_CODE = 403
    public static NOT_FOUND_ERROR_CODE = 404

    public static INTERNAL_SERVER_ERROR_MSG = "Internal server error."

    public static async handleRequest<BodyType, ReturnType>(
        response: Response,
        fn: () => Promise<ReturnType>
    ) {
        try {
            return await fn()
        } catch (e) {

            if (e instanceof HttpError) {
                const errorBody: ErrorBody = { code: e.code, message: e.message }

                return response
                    .status(errorBody.code)
                    .send(errorBody)
            }

            return response
                .status(Api.INTERNAL_SERVER_ERROR_CODE)
                .send({
                    code: 500,
                    message: Api.INTERNAL_SERVER_ERROR_MSG
                })
        }
    }
}