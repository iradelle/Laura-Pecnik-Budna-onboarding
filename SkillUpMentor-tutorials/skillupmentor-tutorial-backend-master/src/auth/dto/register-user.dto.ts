import { Equals, IsEmail, IsNotEmpty, IsOptional, Matches } from "class-validator";
import { Match } from "decorators/match.decorator";

export class RegisterUserDto {
    @IsOptional()
    first_name?: string

    @IsOptional()
    last_name?: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @Matches(/^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{6,}/, {
        message: 'Password must have at least one number, lower and uppercase letetr and it has to be longer then 5 characters.'
    })
    password: string

    // @Match(CreateUserDto, (field) => field.password, {message: 'Passwords do not match.'})
    @IsNotEmpty()
    @Match(RegisterUserDto, (field) => field.password, {message: 'Passwords do not match.'})
    confirm_password: string
}