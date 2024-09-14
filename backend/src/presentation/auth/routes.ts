import {Router} from 'express';
import {AuthController} from './controller';
import {PinoLogger} from '@shared/infraestructure/logger/pinoLogger/pinoLogger';
import Logger from '@shared/domain/Logger';
import {UserDatasource} from '@domain/datasources/user.datasource';
import {MongoUserDatasourceImpl} from '@infrastructure/datasources/mongo/mongo.user.datasources.impl';
import {UserRepository} from '@domain/repositories/user.repository';
import {UserRepositoryImpl} from '@infrastructure/repository/user.repository.impl';
import endpoints from '@config/endpoints';
import {UseCaseAuthImpl} from "@useCases/impl/auth.usecase.impl";
import {UseCaseAuth} from "@useCases/auth.usecase";

export class AuthRoutes {
    static get routes(): Router {

        const userDatasource: UserDatasource = new MongoUserDatasourceImpl();
        const userRepository: UserRepository = new UserRepositoryImpl(userDatasource);
        const useCase: UseCaseAuth = new UseCaseAuthImpl(userRepository);
        const log: Logger = new PinoLogger();
        const controller = new AuthController(log, useCase);

        const router = Router();
        router.post("/", controller.login);
        return router;
    }
}