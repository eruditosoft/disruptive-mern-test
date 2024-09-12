import { UserRepository } from '@src/domain/repositories/user.repository';
import { UseCaseUser } from '../user.usecase';
import { UserRegisterDto } from '@src/domain/dtos/user/register.dto';
import { UserEntity } from '@src/domain/entity/user/user.entity';

export class UseCaseUserImpl implements UseCaseUser {
  constructor( private readonly repository: UserRepository ) { }
  register( userRegisterDto: UserRegisterDto ): Promise<UserEntity> {
    return this.repository.register( userRegisterDto );
  }
  delete( id: string ): Promise<void> {
    return this.repository.delete( id );
  }
}