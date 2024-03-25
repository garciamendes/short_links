import { createClient } from 'redis'

export const redis = createClient({
  url: 'redis://:dev123@localhost:6379'
})

redis.connect()