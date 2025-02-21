import {Request, Response} from 'express';
import {envs} from '@config/envs';

import jwt from 'jsonwebtoken';
import {ROLE} from '@shared/enum/roles';
import {StatusCodes} from 'http-status-codes';
import Logger from '@shared/domain/Logger';
import {PinoLogger} from '@shared/infraestructure/logger/pinoLogger/pinoLogger';

export class JwtAdapter {

    static authenticateToken(req: Request, res: Response, next: Function) {
        const log: Logger = new PinoLogger();
        if (req.method === "POST" && !req.originalUrl.includes("user")) {
            next();
            return
        }
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Token is required or expired",
            description: "Add Header Authorization: bearer some_token"
        });
        try {
            const user = jwt.verify(token?.replaceAll("\"", ""), envs.encrypt.SECRET_KEY);
            req.headers["role"] = (user as unknown as { role: string; }).role;
            req.headers["user_id"] = (user as unknown as { user_id: string; }).user_id;
            next();
            return;
        } catch (error) {
            log.error("Token is required or expired", error);
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Token invalid or expired",
                description: "Add Header Authorization: bearer some_token"
            });
        }
    }

    static createToken = (role: ROLE, alias: string, email: string, userId: string): string => jwt.sign({
        email,
        role,
        alias,
        userId
    }, envs.encrypt.SECRET_KEY, {expiresIn: envs.encrypt.EXPIRATION});

    static validateRoles(req: Request, res: Response, next: Function) {
        if (req.method === "GET" && !req.originalUrl.includes("user")) {
            next();
            return
        }
        const userRole = req.headers["role"];
        if (userRole === ROLE.ADMIN) {
            next();
            return;
        }
        if (userRole === ROLE.READERS && req.method === "GET" && !req.originalUrl.includes("user")) {
            next();
            return;
        }
        if (userRole === ROLE.CREATORS && ["GET", "POST", "PUT"].includes(req.method) && !req.originalUrl.includes("user")) {
            next();
            return;
        }
        const log: Logger = new PinoLogger();
        log.error("Token is required or expired");
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Token invalid or expired",
            description: "Add Header Authorization: bearer some_token"
        });
        return;
    }

}
