import { querySchema } from '@domain/dtos/query/query.dto ';
import { envs } from '@src/config/envs';
import { SORT } from '@src/shared/enum/order';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class QueryMiddleware {

  static setDefaultQuery( req: Request, res: Response, next: Function ) {
    if ( !req.body || Object.keys( req.body ).length === 0 ) {
      req.body = { page: envs.pagination.PAGE, chunk: envs.pagination.CHUNK, sort: SORT.ASC };
      next();
      return;
    }
    const { chunk, page, sort } = req.body;
    const validateQuery = querySchema.partial().safeParse( { chunk, page, sort } );
    if ( validateQuery.error ) return res.status( StatusCodes.BAD_REQUEST ).json( { error: validateQuery } );
    if ( !req.body.chunk ) req.body.chunk = envs.pagination.CHUNK;
    if ( !req.body.page ) req.body.page = envs.pagination.PAGE;
    if ( !req.body.sort ) req.body.sort = SORT.ASC;
    if ( req.body.params && Object.keys( req.body.params ).length === 0 ) delete req.body.params;
    next();
    return;
  }
}