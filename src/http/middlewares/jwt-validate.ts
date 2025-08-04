import { FastifyReply, FastifyRequest } from 'fastify'

export async function validateJwt(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const routeFreeList = [
      'POST-/user',
      'POST-/user/signin',
      'GET-/docs',
      'GET-/docs/json',
      'GET-/docs/*',
    ]
    const validateRoute = `${request.method}-${request.routerPath}`

    if (routeFreeList.includes(validateRoute) || validateRoute.startsWith('GET-/docs')) return

    await request.jwtVerify()
  } catch (error) {
    reply.status(401).send({ message: 'Unauthorized' })
  }
}
