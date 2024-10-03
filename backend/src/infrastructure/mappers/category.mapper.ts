import {CommonError} from '@shared/domain/CommonError';
import {CategoryEntity} from '@domain/entity/category/category.entity';
import {StringAny} from '@shared/domain/KeyValue';
import {StatusCodes} from 'http-status-codes';

export class CategoryMapper {
    static entityFromObject(source: StringAny): CategoryEntity {
        const {id, _id, name, creator, type, createdAt} = source;
        const error = new CommonError("Error captured data Category", StatusCodes.INTERNAL_SERVER_ERROR, "Error colected data", false);
        if (!id || !_id || !name || !creator || !type) throw error;
        return new CategoryEntity(id || _id, name, type, createdAt);
    }

}
