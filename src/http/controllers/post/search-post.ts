import { makeSearchPostUseCase } from '@/use-cases/factory/make-search-post-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPost(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerParamsSchema = z.object({
    text: z.coerce.string(),
  })

  const { text } = registerParamsSchema.parse(request.params)

  const searchPostUseCase = makeSearchPostUseCase()

  const post = await searchPostUseCase.handler(text)

  return reply.status(200).send(post)
}
