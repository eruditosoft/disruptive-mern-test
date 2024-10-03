import Logger from '@shared/domain/Logger';
import {PinoLogger} from '@shared/infraestructure/logger/pinoLogger/pinoLogger';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {CommonDto} from "@shared/domain/commonDto";
import {CategoryRegisterDto} from "@domain/dtos/category/category.register.dto";
import endpoints from "@config/endpoints";

export class ValidateCategory {
    private static log: Logger = new PinoLogger();

    static validateId(req: Request, resp: Response, next: Function) {
        const id = req.params.id;
        if (!id) {
            this.log.error("missing id");
            return resp.status(StatusCodes.BAD_REQUEST).json({error: "Header id is required"});
        }
        if (!CommonDto.validateId(id as string)) {
            this.log.error("invalid format id");
            return resp.status(StatusCodes.BAD_REQUEST).json({error: "Invalid format Header id"});
        }
        next();
        return;
    }

    static validateUpdateCategory(req: Request, resp: Response, next: Function) {
        const id = req.params.id;
        if ( !id || !CommonDto.validateId( id ) ) return resp.status( StatusCodes.BAD_REQUEST ).json( { error: "invalid param id" } );
        const  error = CategoryRegisterDto.validatePartialCategory( req.body );
        if ( error ) {
            this.log.error( "UserUpdate", JSON.parse( error ) );
            return resp.status( StatusCodes.BAD_REQUEST ).json( { error: JSON.parse( error ) } );
        }
        this.log.info( `Initial call endpoint ${ endpoints.category.root }`, req.body );
        next();
        return ;
    }
}