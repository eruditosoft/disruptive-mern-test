import {envs} from '@config/envs';
import {MongoDatabase} from '@data/mongo/mongo-database';
import {PinoLogger} from '@shared/infraestructure/logger/pinoLogger/pinoLogger';
import Logger from '@shared/domain/Logger';
import {Server} from '@presentation/server.express';
import {AppRoutes} from '@presentation/routes';


(() => main())();

async function main() {
    const log: Logger = new PinoLogger();
    await new MongoDatabase(log).connect({
        dbName: envs.mongo.MONGO_DB_NAME,
        mongoUrl: envs.mongo.MONGO_URL,
    });
    await new Server({
        options: {
            port: envs.PORT,
            routes: AppRoutes.routes,
        },
        log,
    }).start();
}