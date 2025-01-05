import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateConfig } from '../config/config';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, validate: validateConfig })],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
