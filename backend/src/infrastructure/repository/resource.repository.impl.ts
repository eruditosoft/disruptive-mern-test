import {ResourceDatasource} from '@domain/datasources/resource.datasource';
import {ResourceRegisterDto} from '@domain/dtos/resource/topic.register.dto';
import {ResourceEntity} from '@domain/entity/resource/resource.entity';
import {ResourceRepository} from '@domain/repositories/resource.repository';
import {StringAny} from "@shared/domain/KeyValue";
import {QueryDto} from "@domain/dtos/query/query.dto";

export class ResourceRepositoryImpl implements ResourceRepository {
    constructor(private readonly datasource: ResourceDatasource) {
    }

    register(input: ResourceRegisterDto, categoryId: string, userId: string): Promise<ResourceEntity> {
        return this.datasource.register(input, categoryId, userId);
    }

    findById(resourceId: string): Promise<ResourceEntity> {
        return this.datasource.findById(resourceId);
    }

    delete(params: StringAny): Promise<void> {
        return this.datasource.delete(params);
    }

    findAll(query: QueryDto): Promise<ResourceEntity[]> {
        return this.datasource.findAll(query);
    }

    update(id: string, name: string): Promise<ResourceEntity> {
        return this.datasource.update(id, name);
    }

}

/*
  findAll( query: QueryCategoryDto ): Promise<CategoryEntity[]> {
    return this.datasource.findAll( query );
  }
 */