import { ResourceDatasource } from '@src/domain/datasources/resource.datasource ';
import { ResourceRepository } from '@src/domain/repositories/resource.repository ';


export class ResourceRepositoryImpl implements ResourceRepository {
  constructor( private readonly datasource: ResourceDatasource ) { }
}