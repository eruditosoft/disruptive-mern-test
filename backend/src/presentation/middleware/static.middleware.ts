import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";


export function staticMiddleware(req: Request, resp: Response, next: Function) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return resp.sendStatus(StatusCodes.UNAUTHORIZED)
    }
    next();
    return;
}
