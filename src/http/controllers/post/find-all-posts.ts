import { makeFindAllPostsUseCase } from '@/use-cases/factory/make-find-all-posts-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function findAllPosts(
  request: FastifyRequest,
  reply: FastifyReply,
) {

  const findAllPostsUseCase = makeFindAllPostsUseCase()

  const posts = await findAllPostsUseCase.handler()

  return reply.status(200).send(posts)
}
