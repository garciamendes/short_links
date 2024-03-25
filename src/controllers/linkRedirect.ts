// Third party
import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

// Project
import { sql } from '../lib/postgres'
import { redis } from '../lib/redis'

export const linkRedirect = async (request: FastifyRequest, reply: FastifyReply) => {
  const paramsSchema = z.object({
    code: z.string()
  })

  try {

    const { code } = paramsSchema.parse(request.params)

    const results = await sql/*sql*/`
      SELECT id, original_url FROM short_links WHERE code=${code}
    `

    if (!results.length)
      return reply.status(404).send({ message: 'link not found!' })

    const link = results[0]

    await redis.zIncrBy('metrics', 1, String(link.id))
    return reply.redirect(301, link.original_url)
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ message: 'Internal error!' })
  }
}