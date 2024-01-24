import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
    private boards = [];

    getAllBoards() {
        // client can get there
        return this.boards;
    }
}
