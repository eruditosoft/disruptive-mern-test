import { Request, Response } from "express";
import { UserRegisterDto } from '@domain/dtos/user/register.dto';
import Logger from '@src/shared/domain/Logger';
import { StatusCodes } from 'http-status-codes';
import { HandleError } from '../handle.error';
import endpoints from '@src/config/endpoints';
import { UseCaseUser } from '@src/useCases/user.usecase';

export class UserController {
  constructor( private readonly log: Logger, private readonly useCase: UseCaseUser ) { }
  register = ( req: Request, resp: Response ) => {
    const [ error, userRegisterDto ] = UserRegisterDto.createUserRegisterDto( req.body );
    if ( error ) {
      this.log.error( "UserRegister", JSON.parse( error ) );
      return resp.status( StatusCodes.BAD_REQUEST ).json( { error: JSON.parse( error ) } );
    }
    this.log.info( `Initial call endpoint ${ endpoints.user.root }`, req.body );
    return this.useCase.register( userRegisterDto! )
      .then( ( user ) => {
        this.log.info( `success complete call endpoint ${ endpoints.user.root }`, {
          email: user.email, method: 'POST' 
        } );
        return resp.json( user ).status( StatusCodes.CREATED );
      } )
      .catch( ( error ) => {
        this.log.error( error );
        return HandleError.handleError( error, resp );
      } );
  };
  delete = ( req: Request, resp: Response ) => {
    const id = req.params.id;
    
    if ( !id || !UserRegisterDto.validateId( id ) ) return resp.status( StatusCodes.BAD_REQUEST ).json( { error: "invalid user id" } );

    return this.useCase.delete( id )
      .then( () => {
        this.log.info( `success complete call endpoint ${ endpoints.user.root }`, { id: id, method: 'DELETE' } );
        return resp.status( StatusCodes.NO_CONTENT ).send();
      } )
      .catch( ( error ) => {
        this.log.error( error );
        return HandleError.handleError( error, resp );
      } );
  };

}