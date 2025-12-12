import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findUser } from './find-user'
import { signin } from './signin'
import { userSchemas } from '@/http/schemas/swagger/user-swagger'
import { updateUser } from './update'
import { deleteUser } from './delete'
import { findAllUsers } from './find-all-users'

export async function userRoutes(app: FastifyInstance) {
  app.get('/user/:id', {
    schema: {
      tags: ['Users'],
      summary: 'Buscar usuário por ID',
      params: userSchemas.findUser,
    },
    handler: findUser
  });

  app.get('/user', {
    schema: {
      tags: ['Users'],
      summary: 'Buscar todos os usuários',
    },
    handler: findAllUsers
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

  app.put('/user/:id', {
    schema: {
      tags: ['Users'],
      summary: 'Editar usuário e pessoa',
      params: userSchemas.findUser,
      body: userSchemas.userUpdate,
    },
    handler: updateUser,
  })

  app.delete('/user/:id', {
    schema: {
      tags: ['Users'],
      summary: 'Deletar usuário e pessoa',
      params: userSchemas.findUser,
    },
    handler: deleteUser,
  })
}
