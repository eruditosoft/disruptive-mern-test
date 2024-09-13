import {ObjectId} from "mongodb";

export  class CommonDto {
    static validateId = ( id: string ): boolean => ObjectId.isValid( id );

}