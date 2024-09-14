import {UserRepository} from '@domain/repositories/user.repository';
import {UseCaseUser} from '@useCases/user.usecase';
import {UserRegisterDto} from '@domain/dtos/user/user.register.dto';
import {UserEntity} from '@domain/entity/user/user.entity';
import {JwtAdapter} from '@config/jwt/jwt.adapter';

export class UseCaseUserImpl implements UseCaseUser {
    constructor(private readonly repository: UserRepository) {
    }

    async login(email: string): Promise<string> {
        const user = await this.repository.findByEmail(email);
        return JwtAdapter.createToken(user.role, user.alias, user.email, user.id);
    }

    update(id: string, userUpdate: UserRegisterDto): Promise<UserEntity> {
        return this.repository.update(id, userUpdate);
    }

    findAll(): Promise<UserEntity[]> {
        return this.repository.findAll();
    }

    register(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
        return this.repository.register(userRegisterDto);
    }

    delete(id: string): Promise<void> {
        return this.repository.delete(id);
    }
}