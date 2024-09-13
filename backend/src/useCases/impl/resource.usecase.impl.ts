import { TopicRepository } from '@domain/repositories/topic.repository';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { UserRepository } from '@domain/repositories/user.repository';
import { UseCaseResource } from '@useCases/resource.usecase';
import { ResourceRepository } from '@domain/repositories/resource.repository ';

export class UseCaseResourceImpl implements UseCaseResource {
  constructor( private readonly repository: CategoryRepository, private readonly userRepository: UserRepository, private readonly topicRepository: TopicRepository, private readonly resourceRepository: ResourceRepository ) { }
}