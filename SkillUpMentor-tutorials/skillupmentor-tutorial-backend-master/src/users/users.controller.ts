import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginatedResult } from 'interfaces/paginated.result.interface';
import { User } from 'entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { isFileExtentionSafe, removeFile, saveImageToStorage } from 'helpers/imageStorage';
import { join } from 'path';
import { HasPermission } from 'decorators/has-permission.decorators';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor) // so exclude option is added
export class UsersController {
    constructor(private readonly usersService: UsersService) {

    }

    @ApiCreatedResponse({description: 'List all users.'})
    @ApiBadRequestResponse({description: 'Error for list of users'})
    @Get()
    @HasPermission('users')
    @HttpCode(HttpStatus.OK)
    async findAll(@Query('page') page: number): Promise<PaginatedResult> {
        return this.usersService.paginate(page, ['role'])
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findById(id)
    }

    @ApiCreatedResponse({description: 'Create new users.'})
    @ApiBadRequestResponse({description: 'Error for creating users'})
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto)
    }

    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('avatar', saveImageToStorage))
    @HttpCode(HttpStatus.CREATED)
    async upload(@UploadedFile() file: Express.Multer.File, @Param('id') id: string): Promise<User> {
        const filename = file?.filename

        if(!filename) throw new BadRequestException('File must ne png, jpg or jpeg.')

        const imagesFolderPath = join(process.cwd(), 'files')
        const fullImagePath = join(imagesFolderPath + '/' + file.filename)

        if (await isFileExtentionSafe(fullImagePath)) {
            return this.usersService.updateUserImageId(id, filename)
        }

        removeFile(fullImagePath)
        throw new BadRequestException('File content does not match extention.')
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<User> {
        return this.usersService.remove(id)
    }
    
}
