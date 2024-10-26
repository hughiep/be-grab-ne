import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './modules/cart/cart.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ErrorModule } from './modules/error/error.module';
import { WdfModule } from './modules/web3-data-fetcher/wdf.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './modules/shared/config/configuration';
import { DataSource } from 'typeorm';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/user/user.module';

@Module({
  imports: [
    CartModule,
    ErrorModule,
    WdfModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    DatabaseModule,
    UsersModule,
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
