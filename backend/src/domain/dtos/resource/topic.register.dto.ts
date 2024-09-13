import { CATEGORIES } from '@shared/enum/categories';
import { StringAny } from '@shared/domain/KeyValue';
import { z } from 'zod';

export const resourceRegisterSchema = z.object( {
  name: z.string( {
    required_error: "Name is required",
    invalid_type_error: "Name not valid"
  } ).min( 3, 'min length 3' )
    .max( 20, 'max length is 20' ),
  content: z.string( {
    required_error: "content is required",
    invalid_type_error: "invalid content"
  } ),
  category: z.nativeEnum( CATEGORIES, {
    required_error: "Category is required",
    invalid_type_error: "Invalid type category"
  } ),
} );

export class ResourceRegisterDto {
  private constructor( public category: CATEGORIES,
    public name: string, public content: string ) { }
  static createResourceDto( input: StringAny ): [ string?, ResourceRegisterDto?] {
    const { name, category, content } = input;
    const validate = resourceRegisterSchema.safeParse( input );
    if ( validate.error ) return [ validate.error.message ];
    return [ undefined, new ResourceRegisterDto( category, name, content ) ];
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