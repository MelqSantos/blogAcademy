import { makeFindAllUsersUseCase } from '@/use-cases/factory/make-find-all-users-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function findAllUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {

  const findAllUsersUseCase = makeFindAllUsersUseCase()

  const users = await findAllUsersUseCase.handler()

  return reply.status(200).send(users)
}
