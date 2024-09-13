import { TopicRegisterDto } from '../dtos/topic/topic.register.dto';
import { TopicEntity } from '../entity/topic/topic.entity';

export abstract class TopicRepository {
  abstract register( input: TopicRegisterDto ): Promise<TopicEntity>;

}