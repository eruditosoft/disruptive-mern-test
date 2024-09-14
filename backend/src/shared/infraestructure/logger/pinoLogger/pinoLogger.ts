import Logger from '@shared/domain/Logger';
import KeyValue from '@shared/domain/KeyValue';
import pino from 'pino';
import config from './config';

/**
 * TODO add intl
 */

export class PinoLogger implements Logger {
    private readonly log;

    constructor() {
        this.log = pino(config);
    }

    info(message: string, attributes?: KeyValue): void {
        if (attributes)
            this.log.info({attributes: {...attributes}}, message);
        else
            this.log.info(message);
    }

    warn(message: string, attributes?: KeyValue): void {
        if (attributes)
            this.log.warn({attributes: {...attributes}}, message);
        else
            this.log.warn(message);
    }

    error(message: string, attributes?: unknown): void {
        if (attributes) this.log.error(attributes, message);
        else this.log.error(message);
    }
}

