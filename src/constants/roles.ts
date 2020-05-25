import { Role } from "../entity/Role.entity";

export enum ROLES {
    admin = 'ADMIN',
    user = 'USER'
}

export const Roles = [
    {
        name: ROLES.admin,
        description: 'An administrator for the app'
    },
    {
        name: ROLES.user,
        description: 'A user for the app'
    }
]