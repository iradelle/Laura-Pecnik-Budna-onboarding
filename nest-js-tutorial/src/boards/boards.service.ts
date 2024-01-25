import { Injectable, NotFoundException } from '@nestjs/common';
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
        const found = this.boards.find((board) => board.id === id);

        // if post not found => Error
        if(!found) {
            throw new NotFoundException(`Can't find board with id ${id}.`);
        }

        return found;
    }

    deleteBoard(id: string): void {
        const found = this.getBoardById(id); // da preveri, če board za delete sloh obstaja
        this.boards = this.boards.filter(board => board.id !== found.id); // če obstaja se bo zbrisal
    }

    updateBoardStatus(id:string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
