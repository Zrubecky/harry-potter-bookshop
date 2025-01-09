import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

export const configSchema = z.object({
  APP_PORT: z.coerce.number().default(3000),
  HOST: z.string().default('0.0.0.0'),
  CORS_ORIGIN: z.string().default('.*'),
});

export type TConfigSchema = z.infer<typeof configSchema>;

export type TConfigService = ConfigService<TConfigSchema, true>;

export const validateConfig = (
  config: Record<string, unknown>,
): TConfigSchema => configSchema.parse(config);
