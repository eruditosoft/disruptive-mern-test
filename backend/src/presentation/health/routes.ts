import { Router } from 'express';
import { HealthController } from './controller';
import endpoints from '@config/endpoints';

export class HealthRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new HealthController();
    router.get( endpoints.root, controller.health );
    return router;
  }
}