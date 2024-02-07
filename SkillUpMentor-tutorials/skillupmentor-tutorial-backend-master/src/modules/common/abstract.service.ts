import { string, when } from '@hapi/joi';
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PaginatedResult } from 'interfaces/paginated.result.interface';
import Logging from 'library/logging';
import { Repository } from 'typeorm';


@Injectable()
export class AbstractService {
    constructor(protected readonly repository: Repository<any>) {}

    async findAll(relations: []): Promise<any[]> {
        try {
            return this.repository.find({relations})
        } catch (error) {
            Logging.error(error)
            throw new InternalServerErrorException('Something went wrong while searching for a list of elements.')
        }
    } 
    
    async findBy(condition, relations = []): Promise<any[] | any> {
        try {
            return this.repository.find({
                where: condition,
                relations,
            })
        } catch (error) {
            Logging.error(error)
            throw new InternalServerErrorException(`Something went wrong while searching for an element with condition [${condition}].`)
        }
    }
    
    async findById(id: string, relations = []): Promise<any> {
        try {
            const element = await this.repository.findOne(
                {
                    where: {id: id},
                    relations
                }
            )

            if(!element) {
                throw new BadRequestException(`Element by id [${id}] could not be found.`)
            } 
            
            return element;

        } catch (error) {
            Logging.error(error)
            Logging.error('Something went wrong while searching for an element with an id')
            throw new InternalServerErrorException(`Something went wrong while searching for an element with an id [${id}].`)
        }
    }

    async remove(id: string): Promise<any> {
        // najdemo element za removanje
        const element = await this.findById(id)

        try {
            return this.repository.remove(element)
        } catch (error) {
            Logging.error(error)
            throw new InternalServerErrorException('Something went row when removing an element.')
        }
    }

    async paginate(page = 1, relations = []): Promise<PaginatedResult> {
        const take = 10 // num users per page

        try {
            const [data, total] = await this.repository.findAndCount({
                take,
                skip: (page - 1) * take,
                relations
            })
    
    
            return{
                data: data,
                meta: {
                    total,
                    page,
                    last_page: Math.ceil(total/take)
                }
            }
        } catch (error) {
            Logging.error(error)
            throw new InternalServerErrorException('Something went wrong while searching for paginated elements.')
        }
            
    }

    
}
