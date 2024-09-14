import { UserRepository } from '@domain/repositories/user.repository';
import { UserDatasource } from '@domain/datasources/user.datasource';
import { UserRegisterDto } from '@domain/dtos/user/user.register.dto';
import { UserEntity } from '@domain/entity/user/user.entity';


export class UserRepositoryImpl implements UserRepository {
  constructor( private readonly datasource: UserDatasource ) { }
  findById( id: string ): Promise<UserEntity> {
    return this.datasource.findById( id );
  }
  findByEmail( email: string ): Promise<UserEntity> {
    return this.datasource.findByEmail( email );
  }
  update( id: string, user: UserRegisterDto ): Promise<UserEntity> {
    return this.datasource.update( id, user );
  }
  findAll(): Promise<UserEntity[]> {
    return this.datasource.findAll();
  }
  delete( id: string ): Promise<void> {
    return this.datasource.delete( id );
  }
  register( userRegister: UserRegisterDto ): Promise<UserEntity> {
    return this.datasource.register( userRegister );
  }



}