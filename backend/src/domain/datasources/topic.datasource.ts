import { TopicRegisterDto } from '../dtos/topic/topic.register.dto';
import { TopicEntity } from '../entity/topic/topic.entity';

export abstract class TopicDatasource {
  abstract register( input: TopicRegisterDto ): Promise<TopicEntity>;
  /*   abstract update( id: string, name: string ): Promise<CategoryEntity>;
    abstract delete( id: string ): Promise<void>;
    abstract register( categoryRegister: CategoryRegisterDto, userId: string ): Promise<CategoryEntity>;
    abstract findAll( query: QueryCategoryDto ): Promise<CategoryEntity[]>; */
}