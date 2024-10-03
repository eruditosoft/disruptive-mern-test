import {ResourceDatasource} from '@domain/datasources/resource.datasource';
import {ResourceEntity} from '@domain/entity/resource/resource.entity';
import {ResourceModel} from '@data/mongo/model/resource.model ';
import {ResourceRegisterDto} from '@domain/dtos/resource/topic.register.dto';
import {ResourceMapper} from '@infrastructure/mappers/resource.mapper';
import {CommonError} from '@shared/domain/CommonError';
import {StatusCodes} from 'http-status-codes';
import {StringAny} from "@shared/domain/KeyValue";
import {QueryDto} from "@domain/dtos/query/query.dto";

export class MongoResourceDatasourceImpl implements ResourceDatasource {
    async register(input: ResourceRegisterDto, topicId: string, userId: string, author: string): Promise<ResourceEntity> {
        const {name, content, category} = input;
        try {
            const nameExist = await ResourceModel.findOne({name});
            if (nameExist) throw new CommonError("Invalid request name resource exists", StatusCodes.BAD_REQUEST, "Invalid Request, name Category exists", true);
            const newResource = await ResourceModel.create({
                name, content, category, userId, topicId, author
            });

            return ResourceMapper.entityFromObject(newResource);
        } catch (error) {

            CommonError.handleError(error);
        }
    }

    async findById(resourceId: string): Promise<ResourceEntity> {
        try {
            const resource = await ResourceModel.findById(resourceId);
            if (!resource) throw new CommonError("Id not exist", StatusCodes.BAD_REQUEST, "resource not Register", true);
            return ResourceMapper.entityFromObject(resource);
        } catch (error) {
            CommonError.handleError(error);
        }
    }

    async delete(params: StringAny): Promise<void> {
        const {condition, id} = params;
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

    async findAll(query: QueryDto): Promise<ResourceEntity[]> {

        try {
            const results = await ResourceModel
                .find(query.filter ?? {})
                .sort({[query.params]: query.sort});
            /*      .skip(query.page - 1)
                  .limit(query.chunk);*/
            return results.map(ResourceMapper.entityFromObject);
        } catch (error) {
            CommonError.handleError(error);
        }
    }

    async update(id: string, name: string): Promise<ResourceEntity> {
        try {
            const resourceUpdate = await ResourceModel.findByIdAndUpdate(id, {$set: {name}});
            return ResourceMapper.entityFromObject(resourceUpdate as StringAny);
        } catch (error) {
            CommonError.handleError(error);
        }
    }
}
