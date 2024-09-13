import { CategoryDatasource } from '@domain/datasources/category.datasource';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { CategoryRegisterDto } from '@src/domain/dtos/category/category.register.dto';
import { QueryCategoryDto } from '@src/domain/dtos/query/query.category.dto';
import { CategoryEntity } from '@src/domain/entity/category/category.entity';
import {query} from "express";
import {Promise} from "mongoose";
import {undefined} from "zod";

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor( private readonly datasource: CategoryDatasource ) { }
  update( id: string, name: string ): Promise<CategoryEntity> {
    return this.datasource.update( id, name );
  }
  delete( id: string ): Promise<void> {
    return this.datasource.delete( id );
  }
  findAll( query: QueryCategoryDto ): Promise<CategoryEntity[]> {
    return this.datasource.findAll( query );
  }
  register( categoryRegister: CategoryRegisterDto, userId: string ): Promise<CategoryEntity> {
    return this.datasource.register( categoryRegister, userId );
  }

  findById(categoryId: string): Promise<CategoryEntity> {
    return this.datasource.findById( categoryId );
  }
}