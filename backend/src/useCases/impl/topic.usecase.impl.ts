import { TopicRepository } from '@domain/repositories/topic.repository';
import { UseCaseTopic } from '@useCases/topic.usecase';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { UserRepository } from '@domain/repositories/user.repository';
import { TopicRegisterDto } from '@src/domain/dtos/topic/topic.register.dto';
import { TopicEntity } from '@src/domain/entity/topic/topic.entity';
import {Promise} from "mongoose";
import {undefined} from "zod";
import {ResourceRepository} from "@domain/repositories/resource.repository ";
import {StringAny} from "@shared/domain/KeyValue";

export class UseCaseTopicImpl implements UseCaseTopic {
  constructor(private readonly repository: CategoryRepository, private readonly userRepository: UserRepository, private readonly topicRepository: TopicRepository, private readonly resourceRepository: ResourceRepository) { }
  register( input: TopicRegisterDto ): Promise<TopicEntity> {
    return this.topicRepository.register( input );
  }

  async delete(id: string ): Promise<void>{
    const params = { condition:{ topicId: id} };
    await this.resourceRepository.delete(params)
    return this.topicRepository.delete(id);
  }
}