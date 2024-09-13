import Logger from '@shared/domain/Logger';
import { UseCaseTopic } from '@useCases/topic.usecase';

export class ResourceController { 
  constructor( private readonly log: Logger, private useCase: UseCaseTopic ) { }

}