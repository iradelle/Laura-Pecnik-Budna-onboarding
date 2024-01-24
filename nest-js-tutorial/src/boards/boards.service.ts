import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import{v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        // client can get there
        return this.boards;
    }

    createBoard(CreateBoardDto: CreateBoardDto) {

        const { title, description } = CreateBoardDto;

        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        return this.boards.find((board) => board.id === id);
    }

    deleteBoard(id: string): void {
        this.boards = this.boards.filter(board => board.id !== id);
    }
}
