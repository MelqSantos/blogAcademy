import { makeUpdateUserUseCase } from '@/use-cases/factory/make-update-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const updateUserParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const updateUserBodySchema = z.object({
    username: z.string().optional(),
    role: z.string().optional(),
    name: z.string().optional(),
    birth: z.string().optional(),
    email: z.string().email().optional(),
  })

  const { id } = updateUserParamsSchema.parse(request.params)
  const { username, role, name, birth, email } = updateUserBodySchema.parse(
    request.body,
  )

  const userData = {
    ...(username && { username }),
    ...(role && { role }),
  }

  const personData = {
    ...(name && { name }),
    ...(birth && { birth }),
    ...(email && { email }),
  }

  try {
    const updateUserUseCase = makeUpdateUserUseCase()
    const user = await updateUserUseCase.handler({
      userId: id,
      userData,
      personData,
    })

    return reply.status(200).send(user)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}