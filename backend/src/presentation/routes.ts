import { Router } from 'express';
import { UserRoutes } from './user/routes';
import endpoints from '@config/endpoints';
import { HealthRoutes } from './health/routes';
import { CategoryRouter } from './categories/routes';
export class AppRoutes {

  static get routes(): Router {
    const router = Router();
    router.use( endpoints.health, HealthRoutes.routes );
    router.use( endpoints.user.root, UserRoutes.routes );
    router.use( endpoints.category.root, CategoryRouter.routes );

    return router;
  }
}