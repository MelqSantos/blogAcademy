import { makeFindPersonUseCase } from '@/use-cases/factory/make-find-person-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findPerson(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerParamsSchema = z.object({
    id_user: z.number(),
  })

  const { id_user } = registerParamsSchema.parse(request.params)

  const findPersonUseCase = makeFindPersonUseCase()

  const person = await findPersonUseCase.handler(id_user)

  return reply.status(200).send(person)
}