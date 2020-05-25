import { injectable, inject } from "inversify";
import { Connection, createConnection, Repository } from "typeorm";
import { TYPES } from "../constants/types";
import { DatabaseService } from "../services/database.service";
import { Request, NextFunction, Response } from "express";
import { CutsomRequest } from "../interfaces/Request";
import { ROLES } from "../constants/roles";
import { BaseMiddleware } from "inversify-express-utils";

const checkRole = (req: CutsomRequest<any>, role: ROLES):boolean => req.user.roles.findIndex(r => r.name === ROLES.admin) != -1;
 

@injectable()
export class AdminMiddleware extends BaseMiddleware {

    constructor(
        @inject(TYPES.DatabaseService) private db: DatabaseService,
    ) {
        super();
    }

    handler(req: CutsomRequest<any>, res: Response, next: NextFunction) {
        if (!checkRole(req, ROLES.admin)) {
            throw new Error('User does not have sufficient role permissions');
        }
        next();
    } 
}