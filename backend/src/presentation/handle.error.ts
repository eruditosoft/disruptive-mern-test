import {Response} from 'express';
import {CommonError} from '@shared/domain/CommonError';
import {StatusCodes} from 'http-status-codes';

export class HandleError {
    static handleError(error: unknown, response: Response): Response {
        if (error instanceof CommonError)
            return response.status(error.httpCode).json({message: "error.server", cause: error.message});
        return response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({message: "error.server", cause: "Internal Server Error unknown"});
    }
}
