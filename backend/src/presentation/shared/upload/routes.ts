import {Request, Router} from "express";
import endpoints from "@config/endpoints";
import {UploadController} from "./controller";
import upload from "@presentation/shared/upload/multer.middleware";

export class UploadRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new UploadController();
        router.post(endpoints.root, upload.single("file"), controller.upload);
        return router;
    }
}


