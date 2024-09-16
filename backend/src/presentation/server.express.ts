import Logger from '@shared/domain/Logger';
import express, {Router} from "express";
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import {envs} from "@config/envs";
import * as path from "node:path";
import cookieParser from "cookie-parser";
import appRootPath from "app-root-path";
import endpoints from "@config/endpoints";
import {staticMiddleware} from "@presentation/middleware/static.middleware";

interface Options {
    port?: number;
    routes: Router;
}
export class Server {
    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;
    private readonly log: Logger;

    constructor({options, log}: { options: Options, log: Logger; }) {
        const {port = 3100, routes} = options;
        this.port = port;
        this.routes = routes;
        this.log = log;
    }

    async start() {
        this.app.disable("x-powered-by");
        this.app.use(express.json());
        this.app.use(cookieParser());
        //TODO arreglar las opciones reales del server para los cors.
        this.app.use(cors());
        this.app.use(express.urlencoded({extended: true}));
        //TODO agregar logica del token en el front y colocar el static middleware, ojo esa logica es provicional debe ir en el jwt
        this.app.use(endpoints.static.root,staticMiddleware, express.static(path.join(appRootPath.path, envs.PATH_FILES)));
        this.app.use(express.static("public"));
        this.app.use(
            "/docs",
            swaggerUi.serve,
            swaggerUi.setup(undefined, {
                swaggerOptions: {
                    url: "/swagger.json",
                },
            })
        );
        this.app.use(this.routes);
        this.app.listen(this.port, () =>
            this.log.info(`server running on port ${this.port}`)
        );
    }
}
