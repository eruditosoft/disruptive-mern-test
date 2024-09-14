import {Router} from 'express';
import {UserController} from './controller';
import {PinoLogger} from '@shared/infraestructure/logger/pinoLogger/pinoLogger';
import Logger from '@shared/domain/Logger';
import {UserDatasource} from '@domain/datasources/user.datasource';
import {MongoUserDatasourceImpl} from '@infrastructure/datasources/mongo/mongo.user.datasources.impl';
import {UserRepository} from '@domain/repositories/user.repository';
import {UserRepositoryImpl} from '@infrastructure/repository/user.repository.impl';
import {UseCaseUser} from '@useCases/user.usecase';
import {UseCaseUserImpl} from '@useCases/impl/user.usecase.impl';
import endpoints from '@config/endpoints';

export class UserRoutes {
    static get routes(): Router {
        const userDatasource: UserDatasource = new MongoUserDatasourceImpl();
        const userRepository: UserRepository = new UserRepositoryImpl(userDatasource);
        const useCase: UseCaseUser = new UseCaseUserImpl(userRepository);
        const log: Logger = new PinoLogger();
        const controller = new UserController(log, useCase);

        const router = Router();

        router.post(endpoints.root, controller.register);
        router.delete(endpoints.id, controller.delete);
        router.get(endpoints.root, controller.findAll);
        router.put(endpoints.id, controller.update);
        return router;
    }
}