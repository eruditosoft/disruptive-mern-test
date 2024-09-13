import { CategoryRegisterDto } from '@domain/dtos/category/category.register.dto';
import { CategoryEntity } from '@domain/entity/category/category.entity';
import { QueryCategoryDto } from '../dtos/query/query.category.dto';

export abstract class CategoryRepository {
  abstract update( id: string, name: string ): Promise<CategoryEntity>;
  abstract delete( id: string ): Promise<void>;
  abstract findAll( query: QueryCategoryDto ): Promise<CategoryEntity[]>;
  abstract register( categoryRegister: CategoryRegisterDto, userId: string ): Promise<CategoryEntity>;
  abstract findById(categoryId: string):Promise<CategoryEntity>;
}