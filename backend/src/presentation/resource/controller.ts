import Logger from "@shared/domain/Logger";
import endpoints from "@config/endpoints";
import {ResourceRegisterDto} from "@domain/dtos/resource/topic.register.dto";
import {UseCaseResource} from "@useCases/resource.usecase";
import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {HandleError} from "@presentation/handle.error";
import {CommonDto} from "@shared/domain/commonDto";
import {QueryDto} from "@domain/dtos/query/query.dto";

export class ResourceController {
    constructor(
        private readonly log: Logger,
        private useCase: UseCaseResource,
    ) {
    }

    register = (req: Request, resp: Response) => {
        const userId = req.params.userId;
        const topicId = req.params.topicId;
        const [error, input] = ResourceRegisterDto.createResourceDto(req.body);
        if (error) {
            this.log.error(error);
            return resp
                .status(StatusCodes.BAD_REQUEST)
                .json({error: JSON.parse(error)});
        }
        this.log.info(`Initial call endpoint`, req.body);

        return this.useCase
            .register(input!, topicId, userId)
            .then((resource) => {
                this.log.info(
                    `success complete call endpoint ${endpoints.resource.register}`,
                    {
                        method: "POST",
                        userId,
                        categoryId: topicId,
                        body: req.body,
                    },
                );
                return resp.json(resource).status(StatusCodes.CREATED);
            })
            .catch((error) => {
                this.log.error(error);
                return HandleError.handleError(error, resp);
            });
    };

    delete = (req: Request, resp: Response) => {
        const id = req.params.id;

        if (!id || !CommonDto.validateId(id))
            return resp
                .status(StatusCodes.BAD_REQUEST)
                .json({error: "invalid resource id"});
        return this.useCase
            .delete(id)
            .then(() => {
                this.log.info(
                    `success complete call endpoint ${endpoints.resource.root}`,
                    {id: id, method: "DELETE"},
                );
                return resp.sendStatus(StatusCodes.NO_CONTENT);
            })
            .catch((error) => {
                this.log.error(error);
                return HandleError.handleError(error, resp);
            });
    };

    findAll = (req: Request, resp: Response) => {
        const query = QueryDto.createQueryDto(req.body);
        this.log.info(`Initial call endpoint`, {body: req.body});
        return this.useCase
            .findAll(query!)
            .then((resource) => {
                this.log.info(
                    `success complete call endpoint ${endpoints.resource.root}/find`,
                    {
                        method: "POST",
                        query: JSON.stringify(query),
                    },
                );
                return resp.json(resource).status(StatusCodes.OK);
            })
            .catch((error) => {
                this.log.error(error);
                return HandleError.handleError(error, resp);
            });
    };
    udpate = (req: Request, resp: Response) => {
        const id = req.params.id;
        const {name} = req.body;
        this.log.info(`Initial call endpoint ${endpoints.resource.root}`, req.body);
        return this.useCase
            .update(id, name!)
            .then((user) => {
                this.log.info(
                    `success complete call endpoint ${endpoints.resource.root}`,
                    {
                        id,
                        method: "PUT",
                    },
                );
                return resp.json(user).status(StatusCodes.OK);
            })
            .catch((error) => {
                this.log.error(error);
                return HandleError.handleError(error, resp);
            });
    };
}
