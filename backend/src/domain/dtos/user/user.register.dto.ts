import { ROLE } from '@shared/enum/roles';
import { z } from 'zod';
import { ObjectId } from 'mongodb';
import { StringAny } from '@src/shared/domain/KeyValue';
import regex from '@src/config/regex';
const userRegisterSchema = z.object( {
  role: z.nativeEnum( ROLE, {
    required_error: "Role is required",
    invalid_type_error: "Invalid type role"
  } ),
  alias: z.string( {
    required_error: "alias is required",
    invalid_type_error: "Invalid alias"
  } ).regex( regex.NAME_REGEX ),
  email: z.string( {
    required_error: "Email is required",
    invalid_type_error: "Invalid format email"
  } ).email(),
} );

export class UserRegisterDto {

  private constructor(
    public role: ROLE,
    public alias: string,
    public email: string
  ) { };
  static createUserRegisterDto( input: StringAny ): [ string?, UserRegisterDto?] {
    const { role, alias, email } = input;
    const validate = userRegisterSchema.safeParse( input );
    if ( validate.error ) return [ validate.error.message ];
    return [ undefined, new UserRegisterDto( role, alias, email ) ];
  }

  static validatePartialUser( input: StringAny ): [ string?, UserRegisterDto?] {
    const { role, alias, email } = input;
    const validate = userRegisterSchema.partial().safeParse( input );
    if ( validate.error ) return [ validate.error.message ];
    return [ undefined, new UserRegisterDto( role, alias, email ) ];
  };

}