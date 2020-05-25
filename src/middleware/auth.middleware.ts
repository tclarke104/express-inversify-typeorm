import { BaseMiddleware } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import { TYPES } from '../constants/types';
import { DatabaseService } from '../services/database.service';
import { Request, Response, NextFunction } from 'express';
import { CutsomRequest } from '../interfaces/Request';
import { User } from '../entity/User.entity';
import jwt from "jsonwebtoken";
import { AppSettings} from '../constants/appSettings';

@injectable()
export class AuthMiddleware extends BaseMiddleware {
    constructor(@inject(TYPES.DatabaseService) private db: DatabaseService) { super()}
    
    public async handler(req: CutsomRequest<any>,
        res: Response,
        next: NextFunction) {
        try{
            //  extract token from header
            let token = req.headers.authorization; 
            if (!req.headers.authorization.startsWith('Bearer ')) {
                // Remove Bearer from string
                throw new Error('invalid authorization header')
            }
            token = token.slice(7, token.length).trimLeft();

            // decode token
            let decodedToken = jwt.verify(token, AppSettings.secret) as {id: number}

            // add user to request using id from token
            let repo = this.db.getRepository<User>(User)
            let user = await repo.findOne(decodedToken.id)
            req.user = user;
            next(); 
        } catch (e){
            res.status(401);
            res.send({
                message: 'Failed Auth',
                error: e
            })
        }
    }

}