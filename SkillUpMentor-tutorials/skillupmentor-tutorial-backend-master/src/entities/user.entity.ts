import { Column } from "typeorm";
import { Base } from "./base.entity";
import { Exclude } from "class-transformer";

export class User extends Base {
    @Column({unique: true})
    email: string

    @Column({nullable: true})
    first_name: string

    @Column({nullable: true})
    last_name: string

    @Column({nullable: true})
    avatar: string

    @Column({nullable: true})
    @Exclude()// will not show when searching for users
    password: string

    @Column({nullable: true, default: null})
    @Exclude()// will not show when searching for users
    refresh_token: string

    // role: Role | null
}