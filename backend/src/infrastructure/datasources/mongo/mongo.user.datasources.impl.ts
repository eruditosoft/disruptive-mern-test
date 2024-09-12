import { UserDatasource } from '@domain/datasources/user.datasource';
import { UserModel } from '@data/mongo/model/user.model';
import { UserRegisterDto } from '@domain/dtos/user/register.dto';
import { UserEntity } from '@domain/entity/user/user.entity';
import { UserMapper } from '@infrastructure/mappers/user.mapper';
import { CommonError } from '@shared/domain/CommonError';
import { StatusCodes } from 'http-status-codes';
export class MongoUserDatasourceImpl implements UserDatasource {
  async delete( id: string ): Promise<void> {
    try {
      const userDeleted = await UserModel.findByIdAndDelete( id );
      if ( !userDeleted ) throw new CommonError( "UserId not exist", StatusCodes.BAD_REQUEST, "user not deleted success", true );
      return;
    } catch ( error ) {
      if ( error instanceof CommonError ) throw error;
      throw new Error( "Error disruptive" );
    }

  }

  async register( userRegister: UserRegisterDto ): Promise<UserEntity> {
    const { email, alias, role } = userRegister;
    try {
      const [ aliasExist, emailExist ] = await Promise.all( [ UserModel.findOne( { alias } ), UserModel.findOne( { email } ) ] );
      if ( aliasExist ) throw new CommonError( "Invalid request alias exists", StatusCodes.BAD_REQUEST, "Invalid Request", true );
      if ( emailExist ) throw new CommonError( "Invalid request email exists", StatusCodes.BAD_REQUEST, "Invalid Request", true );
      const user = await UserModel.create( {
        email, alias, role
      } );
      return UserMapper.entityFromObject( user );
    } catch ( error ) {
      if ( error instanceof CommonError ) throw error;
      throw new Error( "Error disruptive" );
    }
  }

}