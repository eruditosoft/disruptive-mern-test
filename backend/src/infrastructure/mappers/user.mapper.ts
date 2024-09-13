import { UserEntity } from '@domain/entity/user/user.entity';
import { CommonError } from '@shared/domain/CommonError';
import { StringAny } from '@shared/domain/KeyValue';
import { StatusCodes } from 'http-status-codes';

export class UserMapper {
  static entityFromObject( source: StringAny ): UserEntity {
    const { id, _id, alias, email, role } = source;
    const error = new CommonError( "Error captured data", StatusCodes.INTERNAL_SERVER_ERROR, "Error colected data", false );
    if ( !id || !_id || !alias || !email || !role ) throw error;
    return new UserEntity( id || _id, alias, email, role );
  }

}
