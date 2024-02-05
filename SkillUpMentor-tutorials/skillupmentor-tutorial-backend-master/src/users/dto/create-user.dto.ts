import { Equals, IsEmail, IsNotEmpty, IsOptional, Matches, isEmail, isNotEmpty } from "class-validator"

export class CreateUserDto {
    @IsOptional()
    first_name?: string

    @IsOptional()
    last_name?: string

    @IsNotEmpty()
    @IsEmail()
    email: string


   role_id: string

    @IsNotEmpty()
    @Matches(/^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{6,}/, {
        message: 'Password must have at least one number, lower and uppercase letetr and it has to be longer then 5 characters.'
    })
    password: string

    // @Matches(CreateUserDto, (field) => field.password, {message: 'Passwords do not match.'})
    @IsNotEmpty()
    @Equals('password', {message: 'Passwords do not match.'})
    confirm_password: string
}