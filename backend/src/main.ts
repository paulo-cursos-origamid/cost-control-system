import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefixo global (ex: /api/users)
  app.setGlobalPrefix('api');

  // Validação global (ESSENCIAL)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos extras
      forbidNonWhitelisted: true, // erro se enviar campo inválido
      transform: true, // transforma tipos automaticamente
    }),
  );

  // CORS (frontend vai precisar)
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();