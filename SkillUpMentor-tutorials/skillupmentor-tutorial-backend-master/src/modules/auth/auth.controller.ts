import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'decorators/public.decorator';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'entities/user.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request, Response } from 'express';
import { RequestWithUser } from 'interfaces/auth.interface';
import { PassThrough } from 'stream';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserData } from 'interfaces/user.interface';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor) // so 'exclude' in the entety is usable
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() body: RegisterUserDto): Promise<User> {
        return this.register(body)
    }
       
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Req() request: RequestWithUser,@Res({passthrough: true}) response: Response): Promise<User> {
        const access_token = await this.authService.generateJwt(request.user)
        response.cookie('access_token', access_token, {httpOnly: true})
        return request.user
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async user(@Req() request: RequestWithUser): Promise<User> {
        const cookie = request.cookies['access_token']
        return this.authService.user(cookie)
    }

    @Post('signout')
    @HttpCode(HttpStatus.OK)
    async signout(@Res({passthrough: true}) response: Response): Promise<{msg: string}> {
        response.clearCookie('access_token')
        return {msg: 'OK'}
    }

    @UseGuards(JwtRefreshAuthGuard)
    @Post('refresh')
    async refreshTokens(@Req() req: Request): Promise<User> {
        return this.authService.refreshTokens(req)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    async getCurrentUser(@this.getCurrentUser() user: User): Promise<UserData> {
        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            avatar: user.avatar,
            role: user.role?.id ? {id: user.role?.id, name: user.role?.name} : null
        }
    }
    
    
}
