import { makeCreateUserUseCase } from '@/use-cases/factory/make-create-user-use-case'
import { hash } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string(),
    role: z.string(),
    name: z.string(),
    birth: z.string(),
    email: z.string().email(),
  })

  const { username, password, role, name, birth, email } =
    registerBodySchema.parse(request.body)

  const hashedPassword = await hash(password, 8)

  const userAndPersonData = {
    username,
    password: hashedPassword,
    role,
    name,
    birth,
    email,
  }

  const createUserUseCase = makeCreateUserUseCase()

  const user = await createUserUseCase.handler(userAndPersonData)

  return reply.status(201).send({ id: user?.id, username: user?.username })
}
