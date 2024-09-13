import { ResourceRegisterDto } from '../dtos/resource/topic.register.dto';
import { ResourceEntity } from '../entity/resource/resource.entity';
import {StringAny} from "@shared/domain/KeyValue";

export abstract class ResourceDatasource {
  abstract register( input: ResourceRegisterDto, categoryId: string, userId: string ): Promise<ResourceEntity>;
  abstract findById(resourceId: string): Promise<ResourceEntity>;
  abstract delete(params: StringAny): Promise<void>;

}