import express, {Request, Response, Router} from 'express';
import {UserRoutes} from './user/routes';
import endpoints from '@config/endpoints';
import {HealthRoutes} from './health/routes';
import {CategoryRouter} from './categories/routes';
import {ResourceRouter} from './resource/routes';
import {TopicRouter} from './topic/routes';
import {AuthRoutes} from "@presentation/auth/routes";
import {UploadRoutes} from "@presentation/shared/upload/routes";
import {envs} from "@config/envs";

export class AppRoutes {

    static get routes(): Router {
        const router = Router();
        router.use(endpoints.health, HealthRoutes.routes);
        router.use(endpoints.user.root, UserRoutes.routes);
        router.use(endpoints.category.root, CategoryRouter.routes);
        router.use(endpoints.resource.root, ResourceRouter.routes);
        router.use(endpoints.topic.root, TopicRouter.routes);
        router.use(endpoints.login, AuthRoutes.routes);
        router.use(endpoints.upload, UploadRoutes.routes);
        return router;
    }
}
const mi =(req: Request, res: Response, next: Function) =>{
    console.log("entre sigoa");
    next();
}