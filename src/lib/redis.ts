// Third party
import { createClient } from 'redis'

// Project
import { env } from '../envs'

export const redis = createClient({
  url: env.DB_REDIS
})

redis.connect()