import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { AppConfigModule } from '../shared/config/config.module';

@Module({
  providers: [CartService],
  imports: [AppConfigModule],
  exports: [],
  controllers: [CartController],
})
export class CartModule {}
