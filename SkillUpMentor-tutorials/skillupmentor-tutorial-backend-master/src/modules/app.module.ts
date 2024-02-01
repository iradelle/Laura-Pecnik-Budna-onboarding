import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from 'config/schema.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.STAGE}`], // stage: lahk production ali development
      validationSchema: configValidationSchema,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
