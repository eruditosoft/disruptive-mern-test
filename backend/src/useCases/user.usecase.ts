import {UserRegisterDto} from '@domain/dtos/user/user.register.dto';
import {UserEntity} from '@domain/entity/user/user.entity';

export abstract class UseCaseUser {
    abstract login(email: string): Promise<string>;

    abstract update(id: string, userUpdate: UserRegisterDto): Promise<UserEntity>;

    abstract findAll(): Promise<UserEntity[]>;

    abstract register(userRegisterDto: UserRegisterDto): Promise<UserEntity>;

    abstract delete(id: string): Promise<void>;
}