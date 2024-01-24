import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [BoardsModule],
  
  
})
export class AppModule {}
