import {
    controller, httpGet, httpPost
  } from 'inversify-express-utils';
import { Response } from 'express';
import { inject } from 'inversify';
import { TYPES } from '../constants/types';
import { UserService } from '../services/user.service';
import { User } from '../entity/User.entity';
import { UserViewModel } from '../interfaces/UserViewModel';
import { CutsomRequest } from '../interfaces/Request';

@controller('/auth')
// @controller('/auth', TYPES.AuthMiddleware)
export class UserController {
    constructor(@inject(TYPES.UserService) private userService: UserService) {}

    @httpGet('/', TYPES.AuthMiddleware) 
    public async getUsers(req: CutsomRequest, res: Response): Promise<UserViewModel[]> {
        return this.userService.getUsers();
    }

    @httpPost('/signup')
    public async signUp(req: CutsomRequest, res: Response): Promise<UserViewModel> {
        return  this.userService.signUp(req.body)
    }

    @httpPost('/signin')
    public async signIn(req: CutsomRequest, res: Response): Promise<any> {
        return this.userService.signIn(req.body.email, req.body.password)
    }

}
