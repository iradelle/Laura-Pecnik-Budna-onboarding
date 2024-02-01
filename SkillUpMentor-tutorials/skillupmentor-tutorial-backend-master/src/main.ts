import { NestFactory } from '@nestjs/core'

import { AppModule } from './modules/app.module'
import { ValidationPipe } from '@nestjs/common'
import cookieParser from 'cookie-parser'
import express from 'express'
import { url } from 'inspector'

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

  const PORT = process.env.PORT || 8080
  await app.listen(PORT)

  console.log(`App is listening on port ${await app.getUrl()}.`);
}
bootstrap()
