import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });
  app.use(cookieParser());
  // Validation pipe validates input against existing data transfer objects. If data does not match
  // criteria defined in DTOs, then the pipe responds with a '400 bad request' error.
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();