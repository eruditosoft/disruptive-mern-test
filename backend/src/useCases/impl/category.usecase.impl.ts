import { CategoryRepository } from '@src/domain/repositories/category.repository';
import { UseCaseCategory } from '../category.usecase';
import { CategoryRegisterDto } from '@src/domain/dtos/category/category.register.dto';
import { UserCategoryEntity } from '@src/domain/entity/userCategory/user.category.entity';
import { UserRepository } from '@src/domain/repositories/user.repository';
import { QueryCategoryDto } from '@src/domain/dtos/query/query.category.dto';
import { CategoryEntity } from '@src/domain/entity/category/category.entity';

export class UseCaseCategoryImpl implements UseCaseCategory {
  constructor( private readonly repository: CategoryRepository, private readonly userRepository: UserRepository ) { }
  update( id: string, name: string ): Promise<CategoryEntity> {
    return  this.repository.update( id, name );
  }
  delete( id: string ): Promise<void> {
    return this.repository.delete( id );
  }
  findAll( query: QueryCategoryDto ): Promise<CategoryEntity[]> {
    return this.repository.findAll( query );
  }
  async register( categoryRegister: CategoryRegisterDto, userId: string ): Promise<UserCategoryEntity> {
    const user = await this.userRepository.findById( userId );
    const category = await this.repository.register( categoryRegister, userId );
    return new UserCategoryEntity( user, category );
  }
}