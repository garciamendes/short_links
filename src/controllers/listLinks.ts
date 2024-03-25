// Third party
import { FastifyRequest, FastifyReply } from 'fastify'

// Project
import { sql } from '../lib/postgres'

export const listLinks = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const results = await sql/*sql*/`
      SELECT * FROM short_links ORDER BY created DESC
    `

    return reply.status(201).send({ results: results })
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ message: 'Internal error!' })
  }
}