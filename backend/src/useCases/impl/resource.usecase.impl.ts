import {TopicRepository} from '@domain/repositories/topic.repository';
import {CategoryRepository} from '@domain/repositories/category.repository';
import {UserRepository} from '@domain/repositories/user.repository';
import {UseCaseResource} from '@useCases/resource.usecase';
import {ResourceRepository} from '@domain/repositories/resource.repository';
import {ResourceRegisterDto} from '@domain/dtos/resource/topic.register.dto';
import {ResourceEntity} from "@domain/entity/resource/resource.entity";
import {QueryDto} from "@domain/dtos/query/query.dto";

export class UseCaseResourceImpl implements UseCaseResource {
    constructor(private readonly categoryRepository: CategoryRepository, private readonly userRepository: UserRepository, private readonly topicRepository: TopicRepository, private readonly resourceRepository: ResourceRepository) {
    }

    async register(input: ResourceRegisterDto, topicId: string, userId: string): Promise<ResourceEntity> {
        await Promise.all([this.topicRepository.findById(topicId), this.userRepository.findById(userId)]);
        return this.resourceRepository.register(input, topicId, userId);
    }

    delete(id: string): Promise<void> {
        return this.resourceRepository.delete({id});
    }

    findAll(query: QueryDto): Promise<ResourceEntity[]> {
        return this.resourceRepository.findAll(query);
    }

    update(id: string, name: string): Promise<ResourceEntity> {
                return this.resourceRepository.update(id, name);
    }
}
