import {ResourceDatasource} from '@domain/datasources/resource.datasource ';
import {ResourceEntity} from '@domain/entity/resource/resource.entity';
import {ResourceModel} from '@src/data/mongo/model/resource.model ';
import {ResourceRegisterDto} from '@domain/dtos/resource/topic.register.dto';
import {ResourceMapper} from '@infrastructure/mappers/resource.mapper';
import {CommonError} from '@shared/domain/CommonError';
import {StatusCodes} from 'http-status-codes';
import {Promise} from "mongoose";
import {StringAny} from "@shared/domain/KeyValue";

export class MongoResourceDatasourceImpl implements ResourceDatasource {
    async register(input: ResourceRegisterDto, topicId: string, userId: string): Promise<ResourceEntity> {
        const {name, content, category} = input;
        try {
            const nameExist = await ResourceModel.findOne({name});
            if (nameExist) throw new CommonError("Invalid request name resource exists", StatusCodes.BAD_REQUEST, "Invalid Request, name category exists", true);
            const newResource = await ResourceModel.create({
                name, content, category, userId, topicId
            });
            return ResourceMapper.entityFromObject(newResource);
        } catch (error) {

            CommonError.handleError(error);
        }
    }

    async findById(resourceId: string): Promise<ResourceEntity> {
        try {
            const resource = await ResourceModel.findById(resourceId);
            if (!resource) throw new CommonError("Id not exist", StatusCodes.BAD_REQUEST, "resource not register", true);
            return ResourceMapper.entityFromObject(resource);
        } catch (error) {
            CommonError.handleError(error);
        }
    }

    async delete(params: StringAny): Promise<void> {
        const { condition, id } = params;
        if (condition) return await this.deleteByCodition(condition);
        try {
            const userDeleted = await ResourceModel.findByIdAndDelete(id);
            if (!userDeleted) throw new CommonError("resource id not exist", StatusCodes.BAD_REQUEST, "resource not deleted success", true);
            return;
        } catch (error) {
            CommonError.handleError(error);
        }
    }

     async deleteByCodition(params: StringAny): Promise<void> {
        try {
            const userDeleted = await ResourceModel.deleteMany(params);
            if (!userDeleted) throw new CommonError("resource id not exist", StatusCodes.BAD_REQUEST, "resource not deleted success", true);
            return;
        } catch (error) {
            CommonError.handleError(error);
        }
    }

}

/*
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
  }*/