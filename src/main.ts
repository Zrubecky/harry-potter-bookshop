import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { TConfigService } from './config/config';
import { Logger } from '@nestjs/common';
import { API_PREFIX } from './constants';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
    },
  );

  const configService = app.get<ConfigService, TConfigService>(ConfigService);

  const port = configService.get('APP_PORT', { infer: true });
  const host = configService.get('HOST', { infer: true });
  const corsOrigin = configService.get('CORS_ORIGIN', { infer: true });

  app.setGlobalPrefix(API_PREFIX);

  const allowedOrigins = (corsOrigin?.split('|') || []).map(
    (origin) => new RegExp(origin),
  );

  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    maxAge: 600,
  });

  await app.listen(port, host);

  Logger.log(`🚀 Server running on http://${host}:${port}`);
}

bootstrap();
