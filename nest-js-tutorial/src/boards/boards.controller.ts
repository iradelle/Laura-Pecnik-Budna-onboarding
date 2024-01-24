import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';
import { title } from 'process';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {

    constructor(private boardsService: BoardsService) {

    }

    @Get()
    getAllBoards(): Board[] {
        return this.boardsService.getAllBoards();
    }

    // board creation function
    @Post()
    createBoard(
        @Body() CreateBoardDto: CreateBoardDto
    ) :Board {
        return this.boardsService.createBoard(CreateBoardDto);
    }

}
