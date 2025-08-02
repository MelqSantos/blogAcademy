import { makeCreatePostUseCase } from '@/use-cases/factory/make-create-post-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    content: z.string(),
    subject: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    author_id: z.coerce.number().optional()
  })

  const { title, content, subject, createdAt, updatedAt, author_id } =
    registerBodySchema.parse(request.body)

  const createPostUseCase = makeCreatePostUseCase()

  const post = await createPostUseCase.handler({
    title,
    content,
    subject,
    createdAt,
    updatedAt,
    author_id
  })

  return reply.status(201).send(post)
}
