import { CategoryDatasource } from '@domain/datasources/category.datasource';
import { CategoryModel } from '@data/mongo/model/category.model';
import { CategoryRegisterDto } from '@domain/dtos/category/category.register.dto';
import { CategoryEntity } from '@domain/entity/category/category.entity';
import { CommonError } from '@shared/domain/CommonError';
import { StatusCodes } from 'http-status-codes';
import { CategoryMapper } from '@infrastructure/mappers/category.mapper';
import { QueryCategoryDto } from '@domain/dtos/query/query.category.dto';
import { StringAny } from '@shared/domain/KeyValue';



export class MongoCategoryDatasourceImpl implements CategoryDatasource {
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
}