import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ErrorModule } from './modules/shared/error/error.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './modules/shared/config/configuration';
import { DataSource } from 'typeorm';
import { DatabaseModule } from './modules/shared/database/database.module';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    LocationModule,
    ErrorModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
