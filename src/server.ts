// Third party
import Fastify from 'fastify'
import { createLink } from './controllers/createLinks'
import { listLinks } from './controllers/listLinks'
import { linkRedirect } from './controllers/linkRedirect'
import { metrics } from './controllers/metrics'

const fastify = Fastify()

fastify.get('/:code', linkRedirect)
fastify.post('/api/links', createLink)
fastify.get('/api/links', listLinks)
fastify.get('/api/metrics', metrics)

fastify.listen({
  port: 3333
}).then(() => console.log('HTTP Running!'))