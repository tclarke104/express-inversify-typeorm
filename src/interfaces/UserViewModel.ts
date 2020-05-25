import { Role } from "../entity/Role.entity";

export interface UserViewModel {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    roles: Role[]
}