import Logger from '@shared/domain/Logger';
import endpoints from '@src/config/endpoints';
import { ResourceRegisterDto } from '@src/domain/dtos/resource/topic.register.dto';
import { UseCaseResource } from '@src/useCases/resource.usecase';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HandleError } from '../handle.error';
import {CommonDto} from "@shared/domain/commonDto";

export class ResourceController {
  constructor( private readonly log: Logger, private useCase: UseCaseResource ) { }

  register = ( req: Request, resp: Response ) => {
    const userId = req.params.userId;
    const topicId = req.params.topicId;
    const [ error, input ] = ResourceRegisterDto.createResourceDto( req.body );
    if ( error ) {
      this.log.error( error );
      return resp.status( StatusCodes.BAD_REQUEST ).json( { error: JSON.parse( error ) } );
    }
    this.log.info( `Initial call endpoint`, req.body );

    return this.useCase.register( input!, topicId, userId ).then( (resource ) => {
      this.log.info( `success complete call endpoint ${ endpoints.resource.register }`, {
        method: 'POST',
        userId,
        categoryId: topicId,
        body: req.body,
      } );
      return resp.json( resource ).status( StatusCodes.CREATED );
    } ).catch( ( error ) => {
      this.log.error( error );
      return HandleError.handleError( error, resp );
    } );
  };

  delete = (req: Request, resp: Response) => {
    const id = req.params.id;

    if (!id || !CommonDto.validateId(id)) return resp.status(StatusCodes.BAD_REQUEST).json({error: "invalid resource id"});
    return this.useCase.delete( id )
        .then( () => {
          this.log.info( `success complete call endpoint ${ endpoints.resource.root }`, { id: id, method: 'DELETE' } );
          return resp.sendStatus( StatusCodes.NO_CONTENT );
        } )
        .catch( ( error ) => {
          this.log.error( error );
          return HandleError.handleError( error, resp );
        } );
  };
}