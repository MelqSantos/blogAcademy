import { makeUpdatePostUseCase } from '@/use-cases/factory/make-update-post-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    id: z.coerce.string(),
  })

  const { id } = registerParamsSchema.parse(request.params)

  const registerBodySchema = z.object({
    title: z.string(),
    content: z.string(),
    subject: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().default(() => new Date()),
    author_id: z.coerce.number().optional()
  })

  const { title, content, subject, createdAt, updatedAt, author_id } =
    registerBodySchema.parse(request.body)

  const updatePostUseCase = makeUpdatePostUseCase()

  const post = await updatePostUseCase.handler({
    id,
    title,
    content,
    subject,
    createdAt,
    updatedAt,
    author_id
  })

  return reply.status(200).send(post)
}
