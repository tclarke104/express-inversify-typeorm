import { Request } from "express";
import { User } from "../entity/User.entity";

export interface CutsomRequest extends Request {
    auth: string;
    user: User;
}