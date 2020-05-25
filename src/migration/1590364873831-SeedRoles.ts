import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { Role } from "../entity/Role.entity";
import { Roles } from "../constants/roles";

export class SeedRoles1590364873831 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let roleRepo = getRepository(Role);
        await roleRepo.save(Roles)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
