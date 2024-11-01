import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './modules/cart/cart.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ErrorModule } from './modules/shared/error/error.module';
import { WdfModule } from './modules/web3-data-fetcher/wdf.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './modules/shared/config/configuration';
import { DataSource } from 'typeorm';
import { DatabaseModule } from './modules/shared/database/database.module';
import { UsersModule } from './modules/user/user.module';
import { LocationModule } from './modules/location/location.module';
import { TripService } from './modules/trip/trip.service';

@Module({
  imports: [
    LocationModule,
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
  providers: [AppService, TripService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
