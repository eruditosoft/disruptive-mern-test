import { UserRepository } from '@domain/repositories/user.repository';
import { UserDatasource } from '@src/domain/datasources/user.datasource';
import { UserRegisterDto } from '@src/domain/dtos/user/register.dto';
import { UserEntity } from '@src/domain/entity/user/user.entity';


export class UserRepositoryImpl implements UserRepository {
  constructor( private readonly datasource: UserDatasource ) { }
  delete( id: string ): Promise<void> {
    return this.datasource.delete( id );
  }
  register( userRegister: UserRegisterDto ): Promise<UserEntity> {
    return this.datasource.register( userRegister );
  }



}