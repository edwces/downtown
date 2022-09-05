import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
