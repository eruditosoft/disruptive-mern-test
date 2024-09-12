import Logger from '@src/shared/domain/Logger';
import express, { Router } from "express";
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
interface Options {
  port?: number;
  routes: Router;
}
export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;
  private readonly log: Logger;
  constructor( { options, log }: { options: Options, log: Logger; } ) {
    const { port = 3100, routes } = options;
    this.port = port;
    this.routes = routes;
    this.log = log;

  }
  async start() {
    this.app.disable( "x-powered-by" );
    this.app.use( express.json() );
    this.app.use( express.urlencoded( { extended: true } ) );
    this.app.use( express.static( "public" ) );
    this.app.use( cors() );
    this.app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup( undefined, {
        swaggerOptions: {
          url: "/swagger.json",
        },
      } )
    );
    this.app.use( this.routes );
    this.app.listen( this.port, () =>
      this.log.info( `server running on port ${ this.port }` )
    );
  }
}
