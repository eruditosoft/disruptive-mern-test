import {Request, Response} from "express";
import Logger from "@shared/domain/Logger";
import {PinoLogger} from "@shared/infraestructure/logger/pinoLogger/pinoLogger";
import {CommonDto} from "@shared/domain/commonDto";
import {StatusCodes} from "http-status-codes";
import endpoints from "@config/endpoints";

export class ValidateMiddleware {

    static validateUpdateName(req: Request, resp: Response, next: Function) {
        const id = req.params.id;
        const log: Logger = new PinoLogger();
        if (!id || !CommonDto.validateId(id)) return resp.status(StatusCodes.BAD_REQUEST).json({error: "invalid param id"});
        const error = CommonDto.validatePartialUpdate(req.body);
        if (error) {
            log.error("UserUpdate", JSON.parse(error));
            return resp.status(StatusCodes.BAD_REQUEST).json({error: JSON.parse(error)});
        }
        log.info(`Initial call endpoint ${endpoints.category.root}`, req.body);
        next();
        return;
    }
}