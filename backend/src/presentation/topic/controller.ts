
import Logger from '@shared/domain/Logger';
import endpoints from '@config/endpoints';
import { TopicRegisterDto } from '@domain/dtos/topic/topic.register.dto';
import { UseCaseTopic } from '@useCases/topic.usecase';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HandleError } from '@presentation/handle.error';

export class TopicController {
  constructor( private readonly log: Logger, private useCase: UseCaseTopic ) { }
  register = ( req: Request, resp: Response ) => {
    const [ error, input ] = TopicRegisterDto.createTopicDto( req.body );
    if ( error ) {
      this.log.error( error );
      return resp.status( StatusCodes.BAD_REQUEST ).json( { error: JSON.parse( error ) } );
    }
    this.log.info( `Initial call endpoint`, req.body );
    return this.useCase.register( input! ).then( ( topic ) => {
      this.log.info( `success complete call endpoint ${ endpoints.topic.root }`, {
        method: 'POST',
      } );
      return resp.json( topic ).status( StatusCodes.CREATED );
    } ).catch( ( error ) => {
      this.log.error( error );
      return HandleError.handleError( error, resp );
    } );
  };

}
/*
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
  };*/