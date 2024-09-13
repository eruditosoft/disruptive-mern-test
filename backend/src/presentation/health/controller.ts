import endpoints from '@config/endpoints';
import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { Route, Get } from 'tsoa';

@Route( endpoints.user.root )
export class HealthController {
  @Get( "/" )
  health = ( _: Request, resp: Response ) => {
    return resp.sendStatus( StatusCodes.NO_CONTENT );
  };
}