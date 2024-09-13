import { Request, Response } from "express";
import { UserRegisterDto } from '@domain/dtos/user/user.register.dto';
import Logger from '@shared/domain/Logger';
import { StatusCodes } from 'http-status-codes';
import { HandleError } from '@presentation/handle.error';
import endpoints from '@config/endpoints';
import { UseCaseUser } from '@useCases/user.usecase';

export class UserController {
  constructor( private readonly log: Logger, private readonly useCase: UseCaseUser ) { }
  login = ( req: Request, resp: Response ) => {
    const { email } = req.body;
    if ( !email ) return resp.status( StatusCodes.BAD_REQUEST ).json( { error: "Email is required" } );
    return this.useCase.login( email )
      .then( ( token ) => {
        this.log.info( `success complete call endpoint ${ endpoints.user.root }/login`, {
          email, method: 'POST'
        } );
        return resp.json( { token } ).status( StatusCodes.OK );
      } )
      .catch( ( error ) => {
        this.log.error( error );
        return HandleError.handleError( error, resp );
      } );
  };

  update = ( req: Request, resp: Response ) => {
    const id = req.params.id;
    if ( !id || !UserRegisterDto.validateId( id ) ) return resp.status( StatusCodes.BAD_REQUEST ).json( { error: "invalid user id" } );
    const [ error, userRegisterDto ] = UserRegisterDto.validatePartialUser( req.body );
    if ( error ) {
      this.log.error( "UserUpdate", JSON.parse( error ) );
      return resp.status( StatusCodes.BAD_REQUEST ).json( { error: JSON.parse( error ) } );
    }
    this.log.info( `Initial call endpoint ${ endpoints.user.root }`, req.body );
    return this.useCase.update( id, userRegisterDto! )
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
  register = ( req: Request, resp: Response ) => {
    const [ error, userRegisterDto ] = UserRegisterDto.createUserRegisterDto( req.body );
    if ( error ) {
      this.log.error( error );
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
  findAll = ( _: Request, resp: Response ) => {
    this.log.info( `Initial call endpoint ${ endpoints.user.root }` );

    return this.useCase.findAll().then( ( users ) => {
      this.log.info( `success complete call endpoint ${ endpoints.user.root }`, {
        method: 'GET'
      } );
      return resp.json( users ).status( StatusCodes.OK );
    } )
      .catch( ( error ) => {
        this.log.error( error );
        return HandleError.handleError( error, resp );
      } );

  };

}