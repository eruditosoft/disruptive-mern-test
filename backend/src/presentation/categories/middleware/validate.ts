import Logger from '@shared/domain/Logger';
import {PinoLogger} from '@shared/infraestructure/logger/pinoLogger/pinoLogger';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {CommonDto} from "@shared/domain/commonDto";

export class ValidateCategory {

    static validateUserId(req: Request, resp: Response, next: Function) {
        const id = req.headers["user_id"] as string;
        const log: Logger = new PinoLogger();
        if (!id) {
            log.error("missing id");
            return resp.status(StatusCodes.BAD_REQUEST).json({error: "Header id is required"});
        }
        if (!CommonDto.validateId(id as string)) {
            log.error("invalid format id");
            return resp.status(StatusCodes.BAD_REQUEST).json({error: "Invalid format Header id"});
        }
        next();
        return;
    }


}