import { CategoryEntity } from '../category/category.entity';
import { UserEntity } from '../user/user.entity';

export class UserCategoryEntity {
  constructor(
    public user: UserEntity,
    public category: CategoryEntity,
  ) { }
}