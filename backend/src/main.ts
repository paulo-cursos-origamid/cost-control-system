import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

import { setupSwagger } from './config/swagger/swagger.config';

import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';

import { TransformResponseInterceptor } from '@/common/interceptors/transform-response.interceptor';
import { RolesGuard } from './common/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new TransformResponseInterceptor());
  app.useGlobalGuards(new RolesGuard(app.get(Reflector)));

  setupSwagger(app);

  const port = Number(process.env.PORT) || 3000;

  await app.listen(port);

  console.log(`🚀 Server running on ${port}`);
}

void bootstrap();
