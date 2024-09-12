import { UserRegisterDto } from '@src/domain/dtos/user/register.dto';
import { UserEntity } from '@src/domain/entity/user/user.entity';

export abstract class UseCaseUser {
  abstract register( userRegisterDto: UserRegisterDto ): Promise<UserEntity>;
  abstract delete( id: string ): Promise<void>;
}