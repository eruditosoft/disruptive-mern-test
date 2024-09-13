import { TopicRepository } from '@domain/repositories/topic.repository';
import { UseCaseTopic } from '@useCases/topic.usecase';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { UserRepository } from '@domain/repositories/user.repository';
import { TopicRegisterDto } from '@src/domain/dtos/topic/topic.register.dto';
import { TopicEntity } from '@src/domain/entity/topic/topic.entity';

export class UseCaseTopicImpl implements UseCaseTopic {
  constructor( private readonly repository: CategoryRepository, private readonly userRepository: UserRepository, private readonly topicRepository: TopicRepository ) { }
  register( input: TopicRegisterDto ): Promise<TopicEntity> {
    return this.topicRepository.register( input );
  }
}