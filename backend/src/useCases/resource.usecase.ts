import {ResourceRegisterDto} from '@domain/dtos/resource/topic.register.dto';
import {ResourceEntity} from '@domain/entity/resource/resource.entity';
import {QueryDto} from "@domain/dtos/query/query.dto ";

export abstract class UseCaseResource {
    abstract register(input: ResourceRegisterDto, topicId: string, userId: string): Promise<ResourceEntity>;

    abstract delete(id: string): Promise<void>;

    abstract findAll(query: QueryDto): Promise<ResourceEntity[]>;

    abstract update(id: string, name: string): Promise<ResourceEntity>;
}
