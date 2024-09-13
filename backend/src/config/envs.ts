import "dotenv/config";
import { get } from 'env-var';
const getValue = ( key: string ): string => get( key ).required().asString();

export const envs = {
  mongo: {
    MONGO_URL: `mongodb://${ getValue( "MONGO_INITDB_ROOT_USERNAME" ) }:${ getValue( "MONGO_INITDB_ROOT_PASSWORD" ) }@${ getValue( "MONGO_DB_HOST" ) }:${ getValue( "MONGO_DB_PORT" ) }`,
    MONGO_DB_NAME: getValue( "MONGO_DB_NAME" ),
  },
  PORT: get( "PORT" ).required().asPortNumber(),
  ENVIRONMENT: getValue( "NODE_ENV" ),
  APP_NAME: getValue( "APP_NAME" ),
  logger: {
    PINO_PATH_LOG: getValue( "PATH_LOG" ) ?? "./logs/output.log"
  },
  VERSION_API: getValue( "VERSION_API" ),
  encrypt: {
    SECRET_KEY: getValue( "SECRET_KEY" ),
    EXPIRATION: getValue( "EXPIRATION" ),
  },
  pagination: {
    PAGE: get( "PAGE" ).asInt(),
    CHUNK: get( "CHUNK" ).asInt(),
    MAX_CHUNK: get( "MAX_CHUNK" ).asInt(),
  }
};
