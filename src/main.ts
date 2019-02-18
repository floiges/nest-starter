import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { logger } from './logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger);// global middleware
  await app.listen(3000);
}
bootstrap();
