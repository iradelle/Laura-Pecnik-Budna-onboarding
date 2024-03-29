import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsOptional, Matches, ValidateIf } from "class-validator"
import { Match } from "decorators/match.decorator"

export class UpdateUserDto {
    
    @ApiProperty({required: false})
    @IsOptional()
    first_name?: string

    @ApiProperty({required: false})
    @IsOptional()
    last_name?: string

    @IsNotEmpty()
    @IsEmail()
    email?: string

    @IsOptional()
    refresh_token?: string

    @IsOptional()
   role_id?: string

   @IsOptional()
   avatar?: string

   @ValidateIf((o) => typeof o.password === 'string' && o.password.length > 0)
    @IsOptional()
    @Matches(/^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{6,}/, {
        message: 'Password must have at least one number, lower and uppercase letetr and it has to be longer then 5 characters.'
    })
    password?: string

    @ValidateIf((o) => typeof o.confirm_password === 'string' && o.confirm_password.length > 0)
    @IsOptional()
    @Match(UpdateUserDto, (field) => field.password, {message: 'Passwords do not match.'})
    confirm_password?: string

}
    
    