import { injectable, inject } from "inversify";
import { TYPES } from "../constants/types";
import { UserFactory } from "../factories/user.factory";
import { DatabaseService} from './database.service';
import { User } from '../entity/User.entity';
import { Repository } from "typeorm";
import jwt from "jsonwebtoken";
import { AppSettings } from "../constants/appSettings";
import crypto from "crypto";
import { UserViewModel } from "../interfaces/UserViewModel";

@injectable()
export class UserService {

    userRepository: Repository<User>;
    constructor(
        @inject(TYPES.DatabaseService) private db: DatabaseService,
        @inject(TYPES.UserFactory) private userFactory: UserFactory) {
            this.userRepository = this.db.getRepository<User>(User);
    }

    async signUp(user): Promise<User> {
        let {hash, salt} = this.generateHash(user.password);
        let dbUser = this.userFactory.buildUser(user.firstName, user.lastName, user.email, user.age, hash, salt)
        let savedUser = await this.userRepository.save(dbUser);
        return savedUser;
    }

    async signIn(email: string, newPassword: string) {
        let {id, password, salt} = await this.userRepository.findOneOrFail({email});
        let {hash} = this.generateHash(newPassword, salt);

        if(hash != password) { throw new Error("Invalid Password") };

        const token = this.generateToken(id);

        return {token}
    }

    async getUsers(): Promise<UserViewModel[]> {
        let users = await this.userRepository.find();
        return users.map(this.userFactory.buildUserViewModel)
    }

    generateHash(password: string, salt?: string): {hash: string, salt: string} {
        const saltLength = 16;

        if(!salt) { 
            salt = crypto.randomBytes(Math.ceil(saltLength/2))
                .toString('hex') /** convert to hexadecimal format */
                .slice(0,saltLength);   /** return required number of characters */ 
        }

        var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);

        var hashValue = hash.digest('hex');

        return {hash: hashValue, salt};
    }

    generateToken(userId: number): string {
        const token = jwt.sign({id: userId}, AppSettings.secret, { expiresIn: '1h' });
        return token;
    }
}