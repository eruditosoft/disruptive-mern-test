import {TopicRegisterDto} from '../dtos/topic/topic.register.dto';
import {TopicEntity} from '../entity/topic/topic.entity';
import {StringAny} from "@shared/domain/KeyValue";

export abstract class TopicDatasource {
    abstract register(input: TopicRegisterDto): Promise<TopicEntity>;

    abstract findById(topicId: string): Promise<TopicEntity>;

    abstract delete(id: string): Promise<void>;
}