import endpoints from '@src/config/endpoints';
import { Request, Response } from "express";
import { Route, Get } from 'tsoa';

@Route( endpoints.user.root )
export class HealthController {
  @Get( "/" )
  health = ( _: Request, resp: Response ) => {
    return resp.status( 200 ).json();
  };
}