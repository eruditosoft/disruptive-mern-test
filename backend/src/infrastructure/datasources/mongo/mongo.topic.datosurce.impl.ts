import {TopicDatasource} from '@domain/datasources/topic.datasource';
import {TopicModel} from '@data/mongo/model/topic.model';
import {TopicRegisterDto} from '@domain/dtos/topic/topic.register.dto';
import {TopicEntity} from '@domain/entity/topic/topic.entity';
import {TopicMapper} from '@infrastructure/mappers/topic.mapper';
import {CommonError} from '@shared/domain/CommonError';
import {StatusCodes} from 'http-status-codes';
import {QueryDto} from "@domain/dtos/query/query.dto";
import {StringAny} from "@shared/domain/KeyValue";


export class MongoTopicDatasourceImpl implements TopicDatasource {
    async delete(id: string): Promise<void> {
        try {
            const topicDeleted = await TopicModel.findByIdAndDelete(id);
            if (!topicDeleted) throw new CommonError("Resource not exist", StatusCodes.BAD_REQUEST, "Resource not deleted success", true);
            return;
        } catch (error) {
            CommonError.handleError(error);
        }
    }

    async register(input: TopicRegisterDto): Promise<TopicEntity> {
        const {name, image, categories} = input;
        try {
            const existTopic = await TopicModel.findOne({name});
            if (existTopic) throw new CommonError("Invalid request name Resource exists", StatusCodes.BAD_REQUEST, "Invalid Request, name Resource exists", true);
            const newTopic = await TopicModel.create({
                name, image, categories,
            });
            return TopicMapper.entityFromObject(newTopic);
        } catch (error) {

            CommonError.handleError(error);
        }
    }

    async findById(topicId: string): Promise<TopicEntity> {
        try {
            const topic = await TopicModel.findById(topicId);
            if (!topic) throw new CommonError("Id not exist", StatusCodes.BAD_REQUEST, "Resource not Register", true);
            return TopicMapper.entityFromObject(topic);
        } catch (error) {
            CommonError.handleError(error);
        }
    }

    async findAll(query: QueryDto): Promise<TopicEntity[]> {
        try {
            const results = await TopicModel
                .find(query.filter ?? {})
                .sort({[query.params]: query.sort});
            /*      .skip(query.page - 1)
                  .limit(query.chunk);*/
            return results.map(TopicMapper.entityFromObject);
        } catch (error) {
            CommonError.handleError(error);
        }
    }

    async update(id: string, body: StringAny): Promise<TopicEntity> {
        try {
            const topicUpdate = await TopicModel.findByIdAndUpdate(id, {$set: body}, {new: true});
            return TopicMapper.entityFromObject(topicUpdate as StringAny);
        } catch (error) {
            CommonError.handleError(error);
        }
    }

}

