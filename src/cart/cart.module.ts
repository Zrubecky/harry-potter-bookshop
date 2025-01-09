import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { CartController } from './cart.controller';

@Module({
  providers: [PriceService],
  controllers: [CartController],
})
export class CartModule {}
