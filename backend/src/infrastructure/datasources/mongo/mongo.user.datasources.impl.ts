import { UserDatasource } from '@domain/datasources/user.datasource';
import { UserModel } from '@data/mongo/model/user.model';
import { UserRegisterDto } from '@domain/dtos/user/user.register.dto';
import { UserEntity } from '@domain/entity/user/user.entity';
import { UserMapper } from '@infrastructure/mappers/user.mapper';
import { CommonError } from '@shared/domain/CommonError';
import { StatusCodes } from 'http-status-codes';
import { StringAny } from '@shared/domain/KeyValue';

export class MongoUserDatasourceImpl implements UserDatasource {
  async findById( userId: string ): Promise<UserEntity> {
    try {
      const user = await UserModel.findById( userId );
      if ( !user ) throw new CommonError( "Id not exist", StatusCodes.BAD_REQUEST, "user not Register", true );
      return UserMapper.entityFromObject( user );
    } catch ( error ) {
      CommonError.handleError( error );
    }
  }
  async findByEmail( email: string ): Promise<UserEntity> {
    try {
      const user = await UserModel.findOne( { email } );
      if ( !user ) throw new CommonError( "Email not exist", StatusCodes.BAD_REQUEST, "user not Register", true );
      return UserMapper.entityFromObject( user );
    } catch ( error ) {
      CommonError.handleError( error );
    }
  }

  async delete( id: string ): Promise<void> {
    try {
      const userDeleted = await UserModel.findByIdAndDelete( id );
      if ( !userDeleted ) throw new CommonError( "UserId not exist", StatusCodes.BAD_REQUEST, "user not deleted success", true );
      return;
    } catch ( error ) {
      CommonError.handleError( error );
    }
  }

  async register( userRegister: UserRegisterDto ): Promise<UserEntity> {
    const { email, alias, role } = userRegister;
    try {
      const [ aliasExist, emailExist ] = await Promise.all( [ UserModel.findOne( { alias } ), UserModel.findOne( { email } ) ] );
      if ( aliasExist ) throw new CommonError( "Invalid request alias exists", StatusCodes.BAD_REQUEST, "Invalid Request", true );
      if ( emailExist ) throw new CommonError( "Invalid request email exists", StatusCodes.BAD_REQUEST, "Invalid Request", true );
      const newUser = await UserModel.create( {
        email, alias, role
      } );
      return UserMapper.entityFromObject( newUser );
    } catch ( error ) {
      CommonError.handleError( error );
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const users = await UserModel.find();
      return users.map( UserMapper.entityFromObject );
    } catch ( error ) {
      CommonError.handleError( error );
    }
  }

  async update( id: string, user: UserRegisterDto ): Promise<UserEntity> {
    try {
      const userUpdate = await UserModel.findByIdAndUpdate( id, user, { new: true } );
      return UserMapper.entityFromObject( userUpdate as StringAny );
    } catch ( error ) {
      CommonError.handleError( error );
    }
  }
}