import { CategoryRegisterDto } from '@domain/dtos/category/category.register.dto';
import { QueryCategoryDto } from '@domain/dtos/query/query.category.dto';
import { UserCategoryEntity } from '@domain/entity/userCategory/user.category.entity';
import { CategoryEntity } from '@src/domain/entity/category/category.entity';

export abstract class UseCaseCategory {
  abstract update( id: string, name: string ): Promise<CategoryEntity>;
  abstract delete( id: string ): Promise<void>;
  abstract findAll( query: QueryCategoryDto ): Promise<CategoryEntity[]>;
  abstract register( categoryRegister: CategoryRegisterDto, userId: string ): Promise<UserCategoryEntity>;
}