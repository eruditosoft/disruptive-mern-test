import {CategoryRepository} from '@domain/repositories/category.repository';
import {UseCaseCategory} from '@useCases/category.usecase';
import {CategoryRegisterDto} from '@domain/dtos/category/category.register.dto';
import {UserCategoryEntity} from '@domain/entity/userCategory/user.category.entity';
import {UserRepository} from '@domain/repositories/user.repository';
import {CategoryEntity} from '@domain/entity/category/category.entity';
import {QueryDto} from "@domain/dtos/query/query.dto";
import {StringAny} from "@shared/domain/KeyValue";

export class UseCaseCategoryImpl implements UseCaseCategory {
    constructor(private readonly repository: CategoryRepository, private readonly userRepository: UserRepository) {
    }

    update(id: string, body: StringAny): Promise<CategoryEntity> {
        return this.repository.update(id, body);
    }

    delete(id: string): Promise<void> {
        return this.repository.delete(id);
    }

    findAll(query: QueryDto): Promise<CategoryEntity[]> {
        return this.repository.findAll(query);
    }

    async register(categoryRegister: CategoryRegisterDto, userId: string): Promise<UserCategoryEntity> {
        const user = await this.userRepository.findById(userId);
        const category = await this.repository.register(categoryRegister, userId);
        return new UserCategoryEntity(user, category);
    }
}