import KeyValue from './KeyValue';

export default abstract class Logger {
    abstract info(message: string, attributes?: KeyValue): void;

    abstract warn(message: string, attributes?: KeyValue): void;

    abstract error(message: string, attributes?: unknown): void;
}
