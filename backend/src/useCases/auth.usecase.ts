import {UserRegisterDto} from '@domain/dtos/user/user.register.dto';
import {UserEntity} from '@domain/entity/user/user.entity';

export abstract class UseCaseAuth {
    abstract login(email: string): Promise<string>;
}