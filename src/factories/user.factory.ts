import { injectable } from 'inversify';
import { User } from '../entity/User.entity';
import { UserViewModel } from '../interfaces/UserViewModel';

@injectable()
export class UserFactory {

    buildUser(firstName: string, lastName: string, email: string, age: number, password: string, salt: string) {
        let user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;
        user.email = email;
        user.password = password;
        user.salt = salt;
        return user;
    }

    buildUserViewModel(user: User): UserViewModel{
        let { id, firstName, lastName, email, age } = user;
        return {
            id,
            firstName,
            lastName,
            email,
            age
        }
    }

}