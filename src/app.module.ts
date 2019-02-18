import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { logger } from './logger.middleware';

//  The @Module() decorator provides metadata that Nest makes use of to organize the application structure
// modules are singletons by default
@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
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
