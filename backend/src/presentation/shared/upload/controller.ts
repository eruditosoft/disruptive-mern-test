import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";

export class UploadController {
    upload = ( req: Request, resp: Response ) => {
            const file = req.file;
        return resp.sendStatus( StatusCodes.CREATED);
    };
}