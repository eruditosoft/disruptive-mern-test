import { CATEGORIES } from '@src/shared/enum/categories';

export class ResourceEntity {
  constructor(
    public id: string,
    public name: string,
    public category: CATEGORIES,
    public createdAt: string,
    public content: string,
    public userId: string,
    public topicId: string,
  ) { }
}