import { CategoryEntity } from '@domain/entity/category/category.entity';
import { UserEntity } from '@src/domain/entity/user/user.entity';

export class UserCategoryEntity {
  constructor(
    public user: UserEntity,
    public category: CategoryEntity,
  ) { }
}