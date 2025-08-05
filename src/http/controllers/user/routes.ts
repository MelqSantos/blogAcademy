import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findUser } from './find-user'
import { signin } from './signin'
import { userSchemas } from '@/http/schemas/swagger/user-swagger'

export async function userRoutes(app: FastifyInstance) {
  app.get('/user/:id', {
    schema: {
      tags: ['Users'],
      summary: 'Buscar usuário por ID',
      params: userSchemas.findUser,
    },
    handler: findUser
  });

  app.post('/user', {
    schema: {
      tags: ['Users'],
      summary: 'Criar usuário',
      body: userSchemas.userCreate,
    },
    handler: create
  });

  app.post('/user/signin', {
    schema: {
      tags: ['Users'],
      summary: 'Logar com usuário',
      body: userSchemas.userSignin,
    },
    handler: signin
  });
}
