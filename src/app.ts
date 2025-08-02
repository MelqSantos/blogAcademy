import 'reflect-metadata'
import '@/lib/typeorm/typeorm'
import fastify from 'fastify'
import { personRoutes } from '@/http/controllers/person/routes'
import { userRoutes } from './http/controllers/user/routes'
import { globalErrorHandler } from './utils/global-error-handler'
import { postRoutes } from './http/controllers/post/routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { validateJwt } from './http/middlewares/jwt-validate'

export const app = fastify()

// app.register(fastifyJwt, {
//   secret: env.JWT_SECRET,
//   sign: { expiresIn: '10m' },
// })

// app.addHook('onRequest', validateJwt)

app.register(personRoutes)
app.register(userRoutes)
app.register(postRoutes)

app.setErrorHandler(globalErrorHandler)
