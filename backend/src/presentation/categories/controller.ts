import {CategoryRegisterDto} from '@domain/dtos/category/category.register.dto';
import Logger from '@shared/domain/Logger';
import {UseCaseCategory} from '@useCases/category.usecase';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {HandleError} from '@presentation/handle.error';
import endpoints from '@config/endpoints';
import {CommonDto} from "@shared/domain/commonDto";
import {QueryDto} from "@domain/dtos/query/query.dto";

export class CategoryController {
  constructor( private readonly log: Logger, private useCase: UseCaseCategory ) { }
  udpate = ( req: Request, resp: Response ) => {
    const id = req.params.id;
    this.log.info( `Initial call endpoint ${ endpoints.user.root }`, req.body );
    return this.useCase.update(id, req.body!)
        .then( ( user ) => {
        this.log.info( `success complete call endpoint ${ endpoints.user.root }`, {
          id, method: 'PUT'
        } );
        return resp.json( user ).status( StatusCodes.OK );
      } )
      .catch( ( error ) => {
        this.log.error( error );
        return HandleError.handleError( error, resp );
      } );

  };
  findAll = ( req: Request, resp: Response ) => {
    const query = QueryDto.createQueryDto( req.body );
    this.log.info( `Initial call endpoint` );
    return this.useCase.findAll( query! ).then( ( category ) => {
      this.log.info( `success complete call endpoint ${ endpoints.category.root }/find`, {
        method: 'POST',
        query: JSON.stringify( query ),
      } );
      return resp.json( category ).status( StatusCodes.CREATED );
    } ).catch( ( error ) => {
      this.log.error( error );
      return HandleError.handleError( error, resp );
    } );
  };
  register = ( req: Request, resp: Response ) => {
    const id = req.headers[ "user_id" ] as string;
    const [ error, categoryRegister ] = CategoryRegisterDto.createCategoryDto( req.body );
    if ( error ) {
      this.log.error( error );
      return resp.status( StatusCodes.BAD_REQUEST ).json( { error: JSON.parse( error ) } );
    }
    this.log.info( `Initial call endpoint`, req.body );
    return this.useCase.register( categoryRegister!, id ).then( ( category ) => {
      this.log.info( `success complete call endpoint ${ endpoints.category.root }`, {
        method: 'POST',
      } );
      return resp.json( category ).status( StatusCodes.CREATED );
    } ).catch( ( error ) => {
      this.log.error( error );
      return HandleError.handleError( error, resp );
    } );
  };
  delete = ( req: Request, resp: Response ) => {
    const id = req.params.id;

    if ( !id || !CommonDto.validateId( id ) ) return resp.status( StatusCodes.BAD_REQUEST ).json( { error: "invalid category id" } );

    return this.useCase.delete( id )
      .then( () => {
        this.log.info( `success complete call endpoint ${ endpoints.user.root }`, { id: id, method: 'DELETE' } );
        return resp.sendStatus( StatusCodes.NO_CONTENT );
      } )
      .catch( ( error ) => {
        this.log.error( error );
        return HandleError.handleError( error, resp );
      } );
  };
}
