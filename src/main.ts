import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { HttpExceptionFilter, PrismaClientExceptionFilter } from './filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);
  const logger = app.get<Logger>(Logger);
  const PORT = config.get<number>('HTTP_PORT') || 3000;
  const NODE_ENV = config.get<string>('NODE_ENV');

  // MIDDLEWARES
  app.enableCors();
  app.useLogger(logger);

  app.useGlobalFilters(
    new HttpExceptionFilter(logger),
    new PrismaClientExceptionFilter(),
  );

  await app.listen(PORT, () => {
    logger.log(
      `ADMIN ${NODE_ENV.toUpperCase()} SERVER RUNNING ON PORT: ${PORT}`,
    );
  });
}
bootstrap();
