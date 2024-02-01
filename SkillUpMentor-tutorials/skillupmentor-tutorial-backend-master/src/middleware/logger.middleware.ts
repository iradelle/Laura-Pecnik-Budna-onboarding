import { Injectable, NestMiddleware } from "@nestjs/common";
import { Socket } from "dgram";
import { Request, Response, NextFunction } from "express";
import Logging from "library/logging";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    // Poda informacijo o prihajajočem requestu
    use(req: Request, res: Response, next: NextFunction) {
        // Getting the request log
        Logging.info(`Incoming => Method [${ req.method }] - Url: [${ req.url }] - Host: [${ req.hostname }] - IP: [${ req.socket.remoteAddress }]`)
    }

    // če je next funkcija jo kljiče, 
    // da lahk request nadaljuje na naslednji route handler
    if (next) {
        next()
    }
}