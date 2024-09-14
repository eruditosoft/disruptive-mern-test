import {CommonError} from '@shared/domain/CommonError';
import {StringAny} from '@shared/domain/KeyValue';
import {StatusCodes} from 'http-status-codes';
import {TopicEntity} from '@domain/entity/topic/topic.entity';

export class TopicMapper {
    static entityFromObject(source: StringAny): TopicEntity {
        const {id, _id, name, categories, image, createdAt} = source;
        const error = new CommonError("Error captured data topic", StatusCodes.INTERNAL_SERVER_ERROR, "Error colected data", false);
        if (!id || !_id || !name || !categories) throw error;
        return new TopicEntity(id || _id, name, categories, createdAt, image);
    }

}
