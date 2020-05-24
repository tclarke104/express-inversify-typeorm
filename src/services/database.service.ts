import { injectable, inject } from "inversify";
import { Connection, createConnection, Repository } from "typeorm";
import { TYPES } from "../constants/types";


@injectable()
export class DatabaseService {

    constructor(
        @inject(TYPES.DatabaseConnection) private connection: Connection,
    ) {
    }

    getRepository<T>(entity):Repository<T> {
        return this.connection.getRepository(entity);
    }

}