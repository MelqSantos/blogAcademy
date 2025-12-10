import { makeFindPersonByRoleUseCase } from '@/use-cases/factory/make-find-person-by-role-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findByRole(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerParamsSchema = z.object({
    role: z.string(),
  })

  const { role } = registerParamsSchema.parse(request.params)

  const findPersonByRoleUseCase = makeFindPersonByRoleUseCase()

  const person = await findPersonByRoleUseCase.handler(role)

  return reply.status(200).send(person)
}