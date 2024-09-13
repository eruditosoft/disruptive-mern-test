import endpoints from '@config/endpoints';
import {Router} from 'express';
import {TopicController} from './controller';
import Logger from '@shared/domain/Logger';
import {PinoLogger} from '@shared/infraestructure/logger/pinoLogger/pinoLogger';
import {CategoryDatasource} from '@domain/datasources/category.datasource';
import {MongoCategoryDatasourceImpl} from '@infrastructure/datasources/mongo/mongo.category.datasource.impl';
import {CategoryRepository} from '@domain/repositories/category.repository';
import {CategoryRepositoryImpl} from '@infrastructure/repository/category.repository.impl';
import {UserDatasource} from '@domain/datasources/user.datasource';
import {MongoUserDatasourceImpl} from '@infrastructure/datasources/mongo/mongo.user.datasources.impl';
import {UserRepository} from '@domain/repositories/user.repository';
import {UserRepositoryImpl} from '@infrastructure/repository/user.repository.impl';
import {TopicDatasource} from '@domain/datasources/topic.datasource';
import {MongoTopicDatasourceImpl} from '@infrastructure/datasources/mongo/mongo.topic.datosurce.impl';
import {TopicRepository} from '@domain/repositories/topic.repository';
import {TopicRepositoryImpl} from '@src/infrastructure/repository/topic.repository.impl';
import {UseCaseTopic} from '@src/useCases/topic.usecase';
import {UseCaseTopicImpl} from '@src/useCases/impl/topic.usecase.impl';
import {ResourceDatasource} from "@domain/datasources/resource.datasource ";
import {MongoResourceDatasourceImpl} from "@infrastructure/datasources/mongo/mongo.resource.datosurce.impl";
import {ResourceRepository} from "@domain/repositories/resource.repository ";
import {ResourceRepositoryImpl} from "@infrastructure/repository/resource.repository.impl";


export class TopicRouter {
    static get routes(): Router {
        const categoryDatasource: CategoryDatasource = new MongoCategoryDatasourceImpl();
        const userDatasource: UserDatasource = new MongoUserDatasourceImpl();
        const topicDatasource: TopicDatasource = new MongoTopicDatasourceImpl();
        const resourceDatasource: ResourceDatasource = new MongoResourceDatasourceImpl();
        const resourceRepository: ResourceRepository = new ResourceRepositoryImpl(resourceDatasource);

        const categoryRepository: CategoryRepository = new CategoryRepositoryImpl(categoryDatasource);
        const userRepository: UserRepository = new UserRepositoryImpl(userDatasource);

        const topicRepository: TopicRepository = new TopicRepositoryImpl(topicDatasource);
        const useCase: UseCaseTopic = new UseCaseTopicImpl(categoryRepository, userRepository, topicRepository, resourceRepository);
        const router = Router();
        const log: Logger = new PinoLogger();
        const controller = new TopicController(log, useCase);
        router.post(endpoints.root, controller.register);
        router.delete(endpoints.id, controller.delete);
        return router;

    }
}