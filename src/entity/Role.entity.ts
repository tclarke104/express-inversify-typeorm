import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    description: string;
}
