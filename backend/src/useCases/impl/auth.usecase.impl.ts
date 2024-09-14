import {UserRepository} from '@domain/repositories/user.repository';
import {JwtAdapter} from '@config/jwt/jwt.adapter';
import {UseCaseAuth} from "@useCases/auth.usecase";

export class UseCaseAuthImpl implements UseCaseAuth {
    constructor(private readonly repository: UserRepository) {
    }

    async login(email: string): Promise<string> {
        const user = await this.repository.findByEmail(email);
        return JwtAdapter.createToken(user.role, user.alias, user.email, user.id);
    }


}