import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

export enum EEnvironment {
  LOCAL = 'local',
  DEV = 'dev',
  PRE_PROD = 'pre-prod',
  PROD = 'prod',
}

export const configSchema = z.object({
  ENVIRONMENT: z.nativeEnum(EEnvironment).default(EEnvironment.DEV),
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('localhost'),
  CORS_ORIGIN: z.string().default('.*'),
});

export type TConfigSchema = z.infer<typeof configSchema>;

export type TConfigService = ConfigService<TConfigSchema, true>;

export const validateConfig = (
  config: Record<string, unknown>,
): TConfigSchema => configSchema.parse(config);
