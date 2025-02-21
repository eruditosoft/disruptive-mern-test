import {TopicRepository} from '@domain/repositories/topic.repository';
import {TopicDatasource} from '@domain/datasources/topic.datasource';
import {TopicRegisterDto} from '@domain/dtos/topic/topic.register.dto';
import {TopicEntity} from '@domain/entity/topic/topic.entity';
import {QueryDto} from "@domain/dtos/query/query.dto";
import {StringAny} from "@shared/domain/KeyValue";


export class TopicRepositoryImpl implements TopicRepository {
    constructor(private readonly datasource: TopicDatasource) {
    }

    register(input: TopicRegisterDto): Promise<TopicEntity> {
        return this.datasource.register(input);
    }

    findById(topicId: string): Promise<TopicEntity> {
        return this.datasource.findById(topicId);
    }

    delete(id: string): Promise<void> {
        return this.datasource.delete(id);
    }

    findAll(query: QueryDto): Promise<TopicEntity[]> {
        return this.datasource.findAll(query);
    }

    update(id: string, body: StringAny): Promise<TopicEntity> {
        return this.datasource.update(id, body);
    }

}