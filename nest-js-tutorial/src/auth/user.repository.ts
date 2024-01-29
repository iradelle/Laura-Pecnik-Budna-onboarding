import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entitiy";
import { AuthCredentialsDto } from "./auth-credentials.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserRepository extends Repository<User> {

    async createUser(authCredentialsDto:AuthCredentialsDto): Promise<void> {
        const {username, password} = authCredentialsDto;


        // za encryptanje gesel
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
    


        const user = this.create({username, password: hashedPassword});

        try {
            await this.save(user);
        } catch (error) {
            console.log('error', error)

            // 23505 koda je za "username že obstaja" error koda
            if( error.code === "23505" ) {
                throw new ConflictException('Username already exists.');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

}