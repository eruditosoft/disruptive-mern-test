import { CommonError } from '@shared/domain/CommonError';
import { StringAny } from '@shared/domain/KeyValue';
import { StatusCodes } from 'http-status-codes';
import { ResourceEntity } from '@src/domain/entity/resource/resource.entity';

export class ResourceMapper {
  static entityFromObject( source: StringAny ): ResourceEntity {
    const { id, _id, name, category, content, createdAt, topicId, userId } = source;
    const error = new CommonError( "Error captured data resource", StatusCodes.INTERNAL_SERVER_ERROR, "Error colected data", false );
    if ( !id || !_id || !name || !category || !topicId || !userId ) throw error;
    return new ResourceEntity( id || _id, name, category, createdAt, content, userId, topicId );
  }

}
