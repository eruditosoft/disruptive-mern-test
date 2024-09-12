import Logger from '@shared/domain/Logger';
import mongoose from 'mongoose';

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  constructor( private readonly log: Logger ) {
    this.log = log;
  }
  async connect( options: Options ) {
    const { mongoUrl, dbName } = options;
    try {
      await mongoose.connect( mongoUrl, {
        dbName: dbName,
      } );
      this.log.info( "connected to database" );
      return true;
    } catch ( error ) {
      this.log.error( "Invalid connection to database mongo " );
      throw error;
    }
  }
}