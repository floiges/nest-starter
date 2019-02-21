import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { logger } from './logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { CatsService } from './cats/cats.service';
// import { HttpExceptionFilter } from './exceptions/http-filter.exception';

//  The @Module() decorator provides metadata that Nest makes use of to organize the application structure
// modules are singletons by default

// Custom Provider
// useValue
// In below example, the CatsService will be overridden by a passed mockCatsService mock object
//  It means, that Nest instead of creating CatsService instance manually, 
// will treat this provider as resolved already, and use mockCatsService as its representative value.
const mockCatsService = {};
const catsServiceProvider = {
  provide: CatsService,
  useValue: mockCatsService
};

// useClass
// const configServiceProvider = {
//   provide: configService,
//   useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService
// };

// The useFactory is a way of creating providers dynamically.
// const connectionFactory = {
//   provide: "Connection",
//   useFactory: (optionsProvider: OptionsProvider) => {
//     const options = optionsProvider.get();
//     return new DatabaseConnection(options);
//   },
//   inject: [OptionsProvider]
// };

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter //  set up a filter directly from any module
    // }, 
    catsServiceProvider,
    AppService],
})
//  We have to set middleware up using the configure() method of the module class.
// Modules that include middleware have to implement the NestModule interface
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .with('AppModule')
      .forRoutes('cats');
  }
}
