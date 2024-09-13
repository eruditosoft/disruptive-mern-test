import { CATEGORIES } from '@shared/enum/categories';
import { StringAny } from '@src/shared/domain/KeyValue';
import { z } from 'zod';

export const topicRegisterSchema = z.object( {
  name: z.string( {
    required_error: "Name is required",
    invalid_type_error: "Name not valid"
  } ).min( 3, 'min length 3' )
    .max( 20, 'max length is 20' ),
  categories: z.array(
    z.nativeEnum( CATEGORIES ),
    {
      required_error: 'category is required.',
      invalid_type_error: 'category must be an array of enum category'
    }
  ),
  image: z.string(),

} );

export class TopicRegisterDto {
  private constructor( public categories: [ CATEGORIES ],
    public name: string, public image: string ) { }
  static createTopicDto( input: StringAny ): [ string?, TopicRegisterDto?] {
    const { name, categories, image } = input;
    const validate = topicRegisterSchema.safeParse( input );
    if ( validate.error ) return [ validate.error.message ];
    return [ undefined, new TopicRegisterDto( categories, name, image ) ];
  }
}
/*

import { CATEGORIES } from '@shared/enum/categories';
import { StringAny } from '@shared/domain/KeyValue';

export const categoryRegisterSchema = z.object( {
  name: z.string().min( 3, 'min length 3' )
    .max( 20, 'max length is 20' ),
  type: z.nativeEnum( CATEGORIES, {
    required_error: "type is required",
    invalid_type_error: "Format not soported"
  } )
} );
export class CategoryRegisterDto {

  private constructor(
    public type: CATEGORIES,
    public name: string,
  ) { };
  static createCategoryDto( input: StringAny ): [ string?, CategoryRegisterDto?] {
    const { name, type } = input;
    const validate = categoryRegisterSchema.safeParse( input );
    if ( validate.error ) return [ validate.error.message ];
    return [ undefined, new CategoryRegisterDto( type, name ) ];
  }
  static validatePartialCategory( input: StringAny ): [ string?, string?] {
    const { name } = input;
    const validate = categoryRegisterSchema.partial().safeParse( { name } );
    if ( validate.error ) return [ validate.error.message ];
    return [ undefined, name ];
  };
} */