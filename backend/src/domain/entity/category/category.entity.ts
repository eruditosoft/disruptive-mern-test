import { CATEGORIES } from '@src/shared/enum/categories';

export class CategoryEntity {
  constructor(
    public id: string,
    public name: string,
    public type: CATEGORIES,
    public createdAt: string,
  ) { }
}