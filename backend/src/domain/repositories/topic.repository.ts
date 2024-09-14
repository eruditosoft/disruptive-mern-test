import {TopicRegisterDto} from '@domain/dtos/topic/topic.register.dto';
import {TopicEntity} from '@domain/entity/topic/topic.entity';
import {QueryDto} from "@domain/dtos/query/query.dto ";
import {StringAny} from "@shared/domain/KeyValue";

export abstract class TopicRepository {
    abstract register(input: TopicRegisterDto): Promise<TopicEntity>;

    abstract findById(topicId: string): Promise<TopicEntity>;

    abstract delete(id: string): Promise<void>;

    abstract findAll(query: QueryDto): Promise<TopicEntity[]> ;

    abstract update(id: string, body: StringAny): Promise<TopicEntity>;
}