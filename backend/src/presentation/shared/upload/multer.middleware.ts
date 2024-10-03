import * as path from "node:path";
import * as fs from "node:fs";
import multer from "multer";
import {Request, Response} from "express";
import {envs} from "@config/envs";

const storage = multer.diskStorage({
    destination,
    filename,
})

function destination(req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    const directory = req.headers.src ? path.join(envs.PATH_FILES, req.headers.src as string) : envs.PATH_FILES;
    const result = fs.mkdirSync(directory, {recursive: true});
    cb(null, directory);
}

function filename(req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    const mime = file.mimetype.split("/")[1];
    const name = req.headers.resource_name ? `${req.headers.resource_name}` : file.originalname;
    cb(null, name)
}

const upload = multer({storage: storage})
export default upload;
