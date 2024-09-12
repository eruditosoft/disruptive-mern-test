import { Router } from 'express';
import { UserController } from './controller';
import { PinoLogger } from '@shared/infraestructure/logger/pinoLogger/pinoLogger';
import Logger from '@shared/domain/Logger';
import { UserDatasource } from '@domain/datasources/user.datasource';
import { MongoUserDatasourceImpl } from '@src/infrastructure/datasources/mongo/mongo.user.datasources.impl';
import { UserRepository } from '@src/domain/repositories/user.repository';
import { UserRepositoryImpl } from '@src/infrastructure/repository/user.repository.impl';
import { UseCaseUser } from '@src/useCases/user.usecase';
import { UseCaseUserImpl } from '@src/useCases/impl/user.usecase.impl';

export class UserRoutes {
  static get routes(): Router {
    const userDatasource: UserDatasource = new MongoUserDatasourceImpl();
    const userRepository: UserRepository = new UserRepositoryImpl( userDatasource );
    const useCase: UseCaseUser = new UseCaseUserImpl( userRepository );
    const router = Router();
    const log: Logger = new PinoLogger();
    const controller = new UserController( log, useCase );
    router.post( "/", controller.register );
    router.delete( "/:id", controller.delete );
    return router;
  }
}