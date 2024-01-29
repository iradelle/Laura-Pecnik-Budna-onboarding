import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import{v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './pipes/board.repository';
import { Board } from './pipes/board.entity';

@Injectable()
export class BoardsService {
    // private boards: Board[] = [];

    // nakažemo, da uporabljamo ta repository
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) {}

    async getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    // getAllBoards(): Board[] {
    //     // client can get there
    //     return this.boards;
    // }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const { title, description } = createBoardDto;

        const board = this.boardRepository.create({
            // ne rabimo id, ker ga avtomatsko kreira
            title,
            description,
            status: BoardStatus.PUBLIC
        })
        await this.boardRepository.save(board);
        return board;
    }

    // createBoard(CreateBoardDto: CreateBoardDto) {

    //     const { title, description } = CreateBoardDto;

    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     }

    //     this.boards.push(board);
    //     return board;
    // }

    async getBoardById(id: number): Promise <Board> {
        const found = await this.boardRepository.findOne( { where: { id: id } } );

        if(!found) {
            throw new NotFoundException(`Can't find board with id ${id}.`);
        }

        return found;
    }

    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);

    //     // if post not found => Error
    //     if(!found) {
    //         throw new NotFoundException(`Can't find board with id ${id}.`);
    //     }

    //     return found;
    // }

    async deleteBoard(id: number): Promise<void> {
        // delete() -> izbriše, če najde, če ne se ne zgodi nč.
        // remove() -> izbriše, če najde, če ne vrže vn error(404).
        const result= await this.boardRepository.delete(id);

        console.log('result', result);

        // v primeru, da ne effecta ničesar -> ne najde in ne izbriše
        if(result.affected === 0) {
            throw new NotFoundException(`Board with id ${id} was not found, therefore it was not deleted.`)
        }
    }

    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id); // da preveri, če board za delete sloh obstaja
    //     this.boards = this.boards.filter(board => board.id !== found.id); // če obstaja se bo zbrisal
    // }

    async updateBoardStatus( id: number, status: BoardStatus ): Promise<Board> {
        // pridobimo board, kermu želimo spremenit status
        const board = await this.getBoardById(id);

        // nastavimo nov status
        board.status = status;
        // shranimo board, ker smo ga spreminjal
        await this.boardRepository.save(board);

        return board;
    }

    // updateBoardStatus(id:string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
