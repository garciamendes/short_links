// Third party
import z from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PostgresError } from 'postgres'

// Project
import { sql } from '../lib/postgres'

export const createLink = async (request: FastifyRequest, reply: FastifyReply) => {
  const bodySchema = z.object({
    code: z.string(),
    url: z.string(),
  })

  try {
    const { code, url } = bodySchema.parse(request.body)

    if (code.split('').includes('/')) {
      return reply.status(400).send({ message: 'Code cannot have slash' })
    }

    const results = await sql/*sql*/`
      INSERT INTO short_links (code, original_url) VALUES (${code}, ${url})
      RETURNING id
    `

    const link = results[0]
    return reply.status(201).send({ link })
  } catch (error) {
    if (error instanceof PostgresError) {
      if (error.code === '23505') {
        reply.status(400).send({ message: 'Duplicated code!' })
      }
    }

    console.error(error)
    return reply.status(500).send({ message: 'Internal error!' })
  }
}