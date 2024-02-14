import { NestFactory } from '@nestjs/core'

import { AppModule } from './modules/app.module'
import { ValidationPipe } from '@nestjs/common'
import cookieParser from 'cookie-parser'
import express from 'express'
import { url } from 'inspector'
import Logging from 'library/logging'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  })

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true
  }) // POMEMBNO, BREZ TEGA NE DELA

  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser()) // so the cookies are visible on the client's site

  // setup to display files
  app.use('/files', express.static('files')) // v tem diru bojo vsi file-i.. ustvarjen bo avtomatsko

  // setup swagger
  const config = new DocumentBuilder()
  .setTitle('NestJS Tutorial API')
  .setDescription('This is API for NestJS tutorial.')
  .setVersion('1.0.0')
  .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, document)
  // setup swagger

  const PORT = process.env.PORT || 8080
  await app.listen(PORT)

  Logging.info(`App is listening on port ${await app.getUrl()}.`);
}
bootstrap()
