// Third party
import Fastify from 'fastify'

// Local
import { env } from './envs'
import { metrics } from './controllers/metrics'
import { listLinks } from './controllers/listLinks'
import { createLink } from './controllers/createLinks'
import { linkRedirect } from './controllers/linkRedirect'

const fastify = Fastify()

fastify.get('/:code', linkRedirect)
fastify.post('/api/links', createLink)
fastify.get('/api/links', listLinks)
fastify.get('/api/metrics', metrics)

fastify.listen({
  port: env.PORT
}).then(() => console.log('HTTP Running!'))