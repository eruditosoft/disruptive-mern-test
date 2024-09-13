import { ResourceRegisterDto } from '@src/domain/dtos/resource/topic.register.dto';
import { ResourceEntity } from '@src/domain/entity/resource/resource.entity';

export abstract class UseCaseResource {
  abstract register( input: ResourceRegisterDto, topicId: string, userId: string ): Promise<ResourceEntity>;
  abstract delete(id: string): Promise<void>;
}