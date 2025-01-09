import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateConfig } from '../config/config';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateConfig }),
    CartModule,
  ],
})
export class AppModule {}
