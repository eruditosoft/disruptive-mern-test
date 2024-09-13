import { TopicRegisterDto } from '@domain/dtos/topic/topic.register.dto';
import { TopicEntity } from '@domain/entity/topic/topic.entity';

export abstract class UseCaseTopic {
  abstract register( input: TopicRegisterDto ): Promise<TopicEntity>;;
}