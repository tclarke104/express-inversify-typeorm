import { injectable, inject } from "inversify";
import { TYPES } from "../constants/types";
import { UserFactory } from "../factories/user.factory";
import { DatabaseService} from './database.service';
import { User } from '../entity/User.entity';
import { Repository, In } from "typeorm";
import jwt from "jsonwebtoken";
import { AppSettings } from "../constants/appSettings";
import crypto from "crypto";
import { UserViewModel } from "../interfaces/UserViewModel";
import { Role } from "../entity/Role.entity";
import { ROLES } from "../constants/roles";
import { NewUserRequest } from "../interfaces/NewUserRequest";

@injectable()
export class UserService {

    userRepository: Repository<User>;
    roleRepository: Repository<Role>;

    constructor(
        @inject(TYPES.DatabaseService) private db: DatabaseService,
        @inject(TYPES.UserFactory) private userFactory: UserFactory,
        ) {
            this.userRepository = this.db.getRepository<User>(User);
            this.roleRepository = this.db.getRepository<Role>(Role);
    }

    async signUp(user: NewUserRequest): Promise<UserViewModel> {
        // generate password hash and salt
        let {hash, salt} = this.generateHash(user.password);

        // find associated roles
        let roles = await this.roleRepository.find({id: In(user.roles)});

        // build and save new user and send to front
        let dbUser = this.userFactory.buildUser(user, hash, salt, roles);
        let savedUser = await this.userRepository.save(dbUser);
        return this.userFactory.buildUserViewModel(savedUser);
    }

    async signIn(email: string, newPassword: string): Promise<{token: string}> {
        // find user in db
        let {id, password, salt} = await this.userRepository.findOneOrFail({email});
        
        // check if hash matches the db record
        let {hash} = this.generateHash(newPassword, salt);
        if(hash != password) { throw new Error("Invalid Password") };

        // generate and send token
        const token = this.generateToken(id);

        return {token}
    }

    async getUsers(): Promise<UserViewModel[]> {
        // find user and map to user viewmodel
        let users = await this.userRepository.find();
        return users.map(this.userFactory.buildUserViewModel)
    }

    async saveRole(name: ROLES, description: string): Promise<Role> {
        // generate new role and save to db
        let role = this.userFactory.buildRole(name, description);
        let savedRole = await this.roleRepository.save(role);
        return savedRole
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