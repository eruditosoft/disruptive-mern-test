import {TopicRegisterDto} from '@domain/dtos/topic/topic.register.dto';
import {TopicEntity} from '@domain/entity/topic/topic.entity';
import {StringAny} from "@shared/domain/KeyValue";

export abstract class TopicRepository {
    abstract register(input: TopicRegisterDto): Promise<TopicEntity>;

    abstract findById(topicId: string): Promise<TopicEntity>;

    abstract delete(id: string): Promise<void>;
}