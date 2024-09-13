import { Request, Response } from 'express';
import { envs } from '@config/envs';

import jwt from 'jsonwebtoken';
import { ROLE } from '@shared/enum/roles';
import { StatusCodes } from 'http-status-codes';
import Logger from '@shared/domain/Logger';
import { PinoLogger } from '@shared/infraestructure/logger/pinoLogger/pinoLogger';

export class JwtAdapter {

  static authenticateToken( req: Request, res: Response, next: Function ) {
    const log: Logger = new PinoLogger();
    const authHeader = req.headers[ 'authorization' ];
    const token = authHeader && authHeader.split( ' ' )[ 1 ];
    if ( !token )
      return res.sendStatus( StatusCodes.BAD_REQUEST );
    try {
      const user = jwt.verify( token?.replaceAll( "\"", "" ), envs.encrypt.SECRET_KEY );
      req.headers[ "role" ] = ( user as unknown as { role: string; } ).role;
      req.headers[ "user_id" ] = ( user as unknown as { user_id: string; } ).user_id;
      next();
      return;
    } catch ( error ) {
      log.error( "Token is required or expired", error );
      return res.status( StatusCodes.BAD_REQUEST ).json( { message: "Token is required or expired", description: "Add header Authorization: bearer some_token" } );
    }
  }

  static createToken = ( role: ROLE, alias: string, email: string, user_id: string ): string => jwt.sign( { email, role, alias, user_id }, envs.encrypt.SECRET_KEY, { expiresIn: envs.encrypt.EXPIRATION } );

  static validateRoles( req: Request, _: Response, next: Function ) {
    const userRole = req.headers[ "role" ];
    console.log( req.method, req.originalUrl );
    console.log( userRole );
    if ( userRole === ROLE.ADMIN ) {
      console.log( "continue" );
      next();
      return;
    }
    console.log( "aqui no" );
    return;
  }

}