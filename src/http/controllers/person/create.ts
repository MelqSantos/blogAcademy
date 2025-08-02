import { makeCreatePersonUseCase } from '@/use-cases/factory/make-create-person-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    birth: z.coerce.date(),
    email: z.string().email(),
    user_id: z.coerce.number(),
  })

  const { name, birth, email, user_id } = registerBodySchema.parse(
    request.body,
  )

  const createPersonUseCase = makeCreatePersonUseCase()

  const person = await createPersonUseCase.handler({
    name,
    birth,
    email,
    user_id,
  })

  return reply.status(201).send(person)
}
