import { ResourceDatasource } from '@src/domain/datasources/resource.datasource ';
import { ResourceRegisterDto } from '@src/domain/dtos/resource/topic.register.dto';
import { ResourceEntity } from '@src/domain/entity/resource/resource.entity';
import { ResourceRepository } from '@src/domain/repositories/resource.repository ';
import {Promise} from "mongoose";
import {undefined} from "zod";
import {StringAny} from "@shared/domain/KeyValue";


export class ResourceRepositoryImpl implements ResourceRepository {
  constructor( private readonly datasource: ResourceDatasource ) { }
  register( input: ResourceRegisterDto, categoryId: string, userId: string ): Promise<ResourceEntity> {
    return this.datasource.register( input, categoryId, userId );
  }

  findById(resourceId: string): Promise<ResourceEntity> {
    return this.datasource.findById(resourceId);
  }

  delete(params: StringAny): Promise<void> {
    return this.datasource.delete(params);
  }

}