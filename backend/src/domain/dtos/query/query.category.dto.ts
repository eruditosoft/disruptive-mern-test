import { StringAny } from '@shared/domain/KeyValue';
import { CATEGORY_KEYS } from '@src/shared/enum/model.keys';
import { SORT } from '@src/shared/enum/order';



export class QueryCategoryDto {

  private constructor(
    public chunk: number,
    public page: number,
    public params: CATEGORY_KEYS,
    public sort: SORT,
  ) { };
  static createQueryDto( input: StringAny ): QueryCategoryDto | void {
    const { chunk, page, params, sort } = input;
    if ( !params || params.length === 0 ) return new QueryCategoryDto( chunk, page, CATEGORY_KEYS.NAME, sort );
    if ( Object.keys( CATEGORY_KEYS ).includes(params) )
      return new QueryCategoryDto( chunk, page, params as CATEGORY_KEYS, sort );
  }



}
