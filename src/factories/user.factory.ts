import { injectable } from 'inversify';
import { User } from '../entity/User.entity';
import { UserViewModel } from '../interfaces/UserViewModel';
import { Role } from '../entity/Role.entity';
import { ROLES } from '../constants/roles';
import { userInfo } from 'os';

@injectable()
export class UserFactory {

    buildUser(firstName: string, lastName: string, email: string, age: number, password: string, salt: string, roles: Role[]) {
        let user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;
        user.email = email;
        user.password = password;
        user.salt = salt;
        user.roles = roles;
        return user;
    }

    buildUserViewModel(user: User): UserViewModel{
        let { id, firstName, lastName, email, age, roles } = user;
        return {
            id,
            firstName,
            lastName,
            email,
            age,
            roles
        }
    }

    buildRole(name: ROLES, description: string) {
        let role = new Role();

        role.name = name;
        role.description = description;

        return role;
    }

}