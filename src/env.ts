import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url('VITE_API_BASE_URL must be a valid URL'),
  VITE_API_TIMEOUT_MS: z.coerce.number().default(30000),
  VITE_AUTH_HEADER_NAME: z.string().default('Authorization'),
  VITE_SENTRY_DSN: z.string().optional().default(''),
  VITE_IDLE_TIMEOUT_MS: z.coerce.number().default(900000),
  VITE_SENSITIVE_IDLE_TIMEOUT_MS: z.coerce.number().default(300000),
  VITE_FEATURE_FLAGS_PROVIDER: z.enum(['local', 'growthbook', 'unleash']).default('local'),
});

export type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(import.meta.env);
