import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { Role } from "./Role.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    password: string;

    @Column()
    salt: string;

    @ManyToMany(type => Role, {
        cascade: true,
        eager: true
    })
    @JoinTable()
    roles: Role[]
}
