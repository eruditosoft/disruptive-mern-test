import {TopicRepository} from '@domain/repositories/topic.repository';
import {UseCaseTopic} from '@useCases/topic.usecase';
import {CategoryRepository} from '@domain/repositories/category.repository';
import {UserRepository} from '@domain/repositories/user.repository';
import {TopicRegisterDto} from '@domain/dtos/topic/topic.register.dto';
import {TopicEntity} from '@domain/entity/topic/topic.entity';
import {ResourceRepository} from "@domain/repositories/resource.repository";
import {QueryDto} from "@domain/dtos/query/query.dto";
import {StringAny} from "@shared/domain/KeyValue";

export class UseCaseTopicImpl implements UseCaseTopic {
    constructor(private readonly repository: CategoryRepository, private readonly userRepository: UserRepository, private readonly topicRepository: TopicRepository, private readonly resourceRepository: ResourceRepository) {
    }

    register(input: TopicRegisterDto): Promise<TopicEntity> {
        return this.topicRepository.register(input);
    }

    async delete(id: string): Promise<void> {
        const params = {condition: {topicId: id}};
        await this.resourceRepository.delete(params)
        return this.topicRepository.delete(id);
    }

    findAll(query: QueryDto): Promise<TopicEntity[]> {
        return this.topicRepository.findAll(query);
    }

    update(id: string, body: StringAny): Promise<TopicEntity> {
        return this.topicRepository.update(id, body);
    }
}