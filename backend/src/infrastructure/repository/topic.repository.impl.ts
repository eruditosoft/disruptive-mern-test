import { TopicRepository } from '@domain/repositories/topic.repository';
import { TopicDatasource } from '@domain/datasources/topic.datasource';
import { TopicRegisterDto } from '@domain/dtos/topic/topic.register.dto';
import { TopicEntity } from '@domain/entity/topic/topic.entity';

export class TopicRepositoryImpl implements TopicRepository {
  constructor( private readonly datasource: TopicDatasource ) { }
  register( input: TopicRegisterDto ): Promise<TopicEntity> {
    return this.datasource.register( input );
  }
}