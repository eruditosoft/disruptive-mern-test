import {StatusCodes} from "http-status-codes";

export class CommonError extends Error {
    public readonly name: string;
    public readonly httpCode: StatusCodes;
    public readonly isOperational: boolean;

    constructor(
        name: string,
        httpCode: StatusCodes,
        description: string,
        isOperational: boolean,
    ) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
    }
}