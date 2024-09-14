import {Request, Response} from "express";
import Logger from '@shared/domain/Logger';
import {StatusCodes} from 'http-status-codes';
import {HandleError} from '@presentation/handle.error';
import endpoints from '@config/endpoints';
import {UseCaseAuth} from "@useCases/auth.usecase";

export class AuthController {
    constructor(private readonly log: Logger, private readonly useCase: UseCaseAuth) {
    }

    login = (req: Request, resp: Response) => {
        const {email} = req.body;
        if (!email) return resp.status(StatusCodes.BAD_REQUEST).json({error: "Email is required"});
        return this.useCase.login(email)
            .then((token) => {
                this.log.info(`success complete call endpoint ${endpoints.user.root}/login`, {
                    email, method: 'POST'
                });
                return resp.json({token}).status(StatusCodes.OK);
            })
            .catch((error) => {
                this.log.error(error);
                return HandleError.handleError(error, resp);
            });
    };


}