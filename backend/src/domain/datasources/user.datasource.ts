import { UserRegisterDto } from '@domain/dtos/user/user.register.dto';
import { UserEntity } from '@domain/entity/user/user.entity';

export abstract class UserDatasource {
  abstract findByEmail( email: string ): Promise<UserEntity>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract register( userRegister: UserRegisterDto ): Promise<UserEntity>;
  abstract delete( id: string ): Promise<void>;
  abstract update( id: string, user: UserRegisterDto ): Promise<UserEntity>;
  abstract findById(userId: string): Promise<UserEntity>;
}