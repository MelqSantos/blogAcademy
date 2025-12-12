import { makeDeleteUserUseCase } from '@/use-cases/factory/make-delete-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const deleteUserParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = deleteUserParamsSchema.parse(request.params)

  try {
    const deleteUserUseCase = makeDeleteUserUseCase()
    await deleteUserUseCase.handler(id)

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}