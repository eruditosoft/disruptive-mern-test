import { Router } from 'express';
import { HealthController } from './controller';

export class HealthRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new HealthController();
    router.get( "/", controller.health );
    return router;
  }
}