import { envs } from '@src/config/envs';
import { SORT } from '@src/shared/enum/order';
import { nativeEnum, z } from 'zod';

export const querySchema = z.object( {
  chunk: z.number( {
    invalid_type_error: "chunk number is invalid"
  } ).int().positive().min( envs.pagination.CHUNK as number ).max( envs.pagination.MAX_CHUNK as number ).int(),
  page: z.number( {
    invalid_type_error: "page number is invalid"
  } ).int().positive().min( 1 ).max( envs.pagination.MAX_CHUNK as number ),
  sort: nativeEnum( SORT )
} );


