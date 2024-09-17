import {ResourceRegisterDto} from '@domain/dtos/resource/topic.register.dto';
import {ResourceEntity} from '@domain/entity/resource/resource.entity';
import {StringAny} from "@shared/domain/KeyValue";
import {QueryDto} from "@domain/dtos/query/query.dto";

export abstract class ResourceDatasource {
    abstract register(input: ResourceRegisterDto, topicId: string, userId: string, author: string): Promise<ResourceEntity>;

    abstract findById(resourceId: string): Promise<ResourceEntity>;

    abstract delete(params: StringAny): Promise<void>;

    abstract findAll(query: QueryDto): Promise<ResourceEntity[]> ;

    abstract update(id: string, name: string): Promise<ResourceEntity>;
}