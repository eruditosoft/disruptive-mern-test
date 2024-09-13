import { CATEGORIES } from '@src/shared/enum/categories';

export class TopicEntity {
  constructor(
    public id: string,
    public name: string,
    public categories: [ CATEGORIES ],
    public createdAt: string,
    public image: string,
  ) { }
}