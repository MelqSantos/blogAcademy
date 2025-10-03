import 'reflect-metadata'
import fastify from 'fastify'
import { personRoutes } from '@/http/controllers/person/routes'
import { userRoutes } from './http/controllers/user/routes'
import { globalErrorHandler } from './utils/global-error-handler'
import { postRoutes } from './http/controllers/post/routes'
import fastifyJwt from '@fastify/jwt'
import { validateJwt } from './http/middlewares/jwt-validate'
import { env } from './env'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import cors from '@fastify/cors' // Importa o plugin

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: '10m' },
})

app.register(cors, {
  origin: true, // Permite todas as origens. Você pode customizar conforme necessário.
})

// Swagger
app.register(swagger, {
  swagger: {
    info: {
      title: 'BlogAcademy API',
      description: 'Documentação dos endpoints da api.',
      version: '1.0.0',
    },
    tags: [
      { name: 'Posts', description: 'Rotas de postagens' },
      { name: 'Users', description: 'Rotas de usuários' },
      { name: 'People', description: 'Rotas de pessoas (Complemento de usuários)' },
    ],
  },
})


app.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  staticCSP: true,
})

app.addHook('onRequest', validateJwt)

app.register(personRoutes)
app.register(userRoutes)
app.register(postRoutes)

app.setErrorHandler(globalErrorHandler)
