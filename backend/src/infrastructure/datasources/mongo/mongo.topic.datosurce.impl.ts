import { TopicDatasource } from '@domain/datasources/topic.datasource';
import { TopicModel } from '@src/data/mongo/model/topic.model ';
import { TopicRegisterDto } from '@src/domain/dtos/topic/topic.register.dto';
import { TopicEntity } from '@src/domain/entity/topic/topic.entity';
import { TopicMapper } from '@src/infrastructure/mappers/topic.mapper';
import { CommonError } from '@src/shared/domain/CommonError';
import { StatusCodes } from 'http-status-codes';

export class MongoTopicDatasourceImpl implements TopicDatasource {
  async register( input: TopicRegisterDto ): Promise<TopicEntity> {
    const { name, image, categories } = input;
    try {
      const existTopic = await TopicModel.findOne( { name } );
      if ( existTopic ) throw new CommonError( "Invalid request name topic exists", StatusCodes.BAD_REQUEST, "Invalid Request, name topic exists", true );
      const newTopic = await TopicModel.create( {
        name, image, categories,
      } );
      return TopicMapper.entityFromObject( newTopic );
    } catch ( error ) {
      CommonError.handleError( error );
    }
  }
}
/*
  async update( id: string, name: string ): Promise<CategoryEntity> {
    try {
      const categoryUpdate = await CategoryModel.findByIdAndUpdate( id, { $set: { name } } );
      return CategoryMapper.entityFromObject( categoryUpdate as StringAny );
    } catch ( error ) {
      CommonError.handleError( error );
    }
  }
  async delete( id: string ): Promise<void> {
    try {
      const userDeleted = await CategoryModel.findByIdAndDelete( id );
      if ( !userDeleted ) throw new CommonError( "Category id not exist", StatusCodes.BAD_REQUEST, "category not deleted success", true );
      return;
    } catch ( error ) {
      CommonError.handleError( error );
    }
  }

  async findAll( query: QueryCategoryDto ): Promise<CategoryEntity[]> {
    try {
      const results = await CategoryModel
        .find()
        .sort( { [ query.params ]: query.sort } )
        .skip( query.page - 1 )
        .limit( query.chunk );
      return results.map( CategoryMapper.entityFromObject );
    } catch ( error ) {
      CommonError.handleError( error );
    }
  }
  async register( categoryRegister: CategoryRegisterDto, creator: string ): Promise<CategoryEntity> {
    const { name, type } = categoryRegister;
    try {
      const nameExist = await CategoryModel.findOne( { name } );
      if ( nameExist ) throw new CommonError( "Invalid request name category exists", StatusCodes.BAD_REQUEST, "Invalid Request, name category exists", true );
      const newCategory = await CategoryModel.create( {
        type, name, creator,
      } );
      return CategoryMapper.entityFromObject( newCategory );
    } catch ( error ) {
      CommonError.handleError( error );
    }
  }
*/