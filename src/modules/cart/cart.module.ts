import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  providers: [CartService],
  imports: [],
  exports: [],
  controllers: [CartController],
})
export class CartModule {}
