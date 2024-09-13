import endpoints from '@config/endpoints';
import { Router } from 'express';
import { CategoryController } from './controller';
import Logger from '@shared/domain/Logger';
import { PinoLogger } from '@shared/infraestructure/logger/pinoLogger/pinoLogger';
import { CategoryDatasource } from '@domain/datasources/category.datasource';
import { MongoCategoryDatasourceImpl } from '@infrastructure/datasources/mongo/mongo.category.datasource.impl';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { CategoryRepositoryImpl } from '@infrastructure/repository/category.repository.impl';
import { UseCaseCategory } from '@useCases/category.usecase';
import { UseCaseCategoryImpl } from '@useCases/impl/category.usecase.impl';
import { UserDatasource } from '@domain/datasources/user.datasource';
import { MongoUserDatasourceImpl } from '@infrastructure/datasources/mongo/mongo.user.datasources.impl';
import { UserRepository } from '@domain/repositories/user.repository';
import { UserRepositoryImpl } from '@infrastructure/repository/user.repository.impl';
import { ValidateCategory } from './middleware/validate';
import { QueryMiddleware } from '../middleware/query.middleware';

export class CategoryRouter {
  static get routes(): Router {
    const categoryDatasource: CategoryDatasource = new MongoCategoryDatasourceImpl();
    const userDatasource: UserDatasource = new MongoUserDatasourceImpl();
    const categoryRepository: CategoryRepository = new CategoryRepositoryImpl( categoryDatasource );
    const userRepository: UserRepository = new UserRepositoryImpl( userDatasource );
    const useCase: UseCaseCategory = new UseCaseCategoryImpl( categoryRepository, userRepository );
    const router = Router();
    const log: Logger = new PinoLogger();
    const controller = new CategoryController( log, useCase );
    router.post( endpoints.root, ValidateCategory.validateUserId, controller.register );
    router.post( endpoints.category.findAll, QueryMiddleware.setDefaultQuery, controller.findAll );
    router.delete( endpoints.id, controller.delete );
    router.put( endpoints.id, controller.udpate );

    return router;

  }
}