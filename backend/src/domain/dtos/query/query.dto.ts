import {envs} from '@src/config/envs';
import {SORT} from '@src/shared/enum/order';
import {nativeEnum, z} from 'zod';
import {QUERY_KEYS} from "@shared/domain/model.keys";
import {StringAny} from "@shared/domain/KeyValue";

export const querySchema = z.object({
    chunk: z.number({
        invalid_type_error: "chunk number is invalid"
    }).int().positive().min(envs.pagination.CHUNK as number).max(envs.pagination.MAX_CHUNK as number).int(),
    page: z.number({
        invalid_type_error: "page number is invalid"
    }).int().positive().min(1).max(envs.pagination.MAX_CHUNK as number),
    sort: nativeEnum(SORT)
});


export class QueryDto {

    private constructor(
        public chunk: number,
        public page: number,
        public params: string,
        public sort: SORT,
        public filter: StringAny,
    ) {
    }

    static createQueryDto(input: StringAny): QueryDto {
        const {chunk, page, params, sort, filter} = input;
        if (!params || params.length === 0) return new QueryDto(chunk, page, QUERY_KEYS.name as string, sort, filter);
        if (params && typeof params === "string" && Object.keys(QUERY_KEYS).includes(params)) {
            const sendParams = QUERY_KEYS[params as string] as string;
            return new QueryDto(chunk, page, sendParams, sort, filter);
        }
        return new QueryDto(chunk, page, QUERY_KEYS.name as string, sort, filter);
    }

    /*
      static createQueryDto(input: StringAny, paramsType: ParamsType): QueryDto | void {
        const {chunk, page, params, sort} = input;
        if (!params || params.length === 0) return new QueryResourceDto(chunk, page, RESOURCE_KEYS.NAME, sort);
        if (Object.keys(RESOURCE_KEYS).includes(params))
          return new QueryResourceDto(chunk, page, RESOURCE_KEYS[params as keyof typeof RESOURCE_KEYS], sort);
      }
    */


}
