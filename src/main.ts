import { HTTP_SERVER_REF } from '@nestjs/core';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './exceptions/all.exception';
// import { HttpExceptionFilter } from './exceptions/http-filter.exception';
// import { logger } from './logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger);// global middleware
  // app.useGlobalFilters(new HttpExceptionFilter());
  const httpRef = app.get(HTTP_SERVER_REF);
  app.useGlobalFilters(new AllExceptionFilter(httpRef));
  await app.listen(3000);
}
bootstrap();
