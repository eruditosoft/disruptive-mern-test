import { UserRegisterDto } from '@domain/dtos/user/register.dto';
import { UserEntity } from '@domain/entity/user/user.entity';

export abstract class UserDatasource {
  abstract register( userRegister: UserRegisterDto ): Promise<UserEntity>;
  abstract delete( id: string ): Promise<void>;
}