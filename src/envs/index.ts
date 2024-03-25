// Third party
import 'dotenv/config'
import { z as zod } from 'zod'

const envSchema = zod.object({
  NODE_ENV: zod.enum(['dev', 'production']).default('dev'),
  PORT: zod.coerce.number().optional().default(3333),
  DB_POSTGRESS: zod.string(),
  DB_REDIS: zod.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data