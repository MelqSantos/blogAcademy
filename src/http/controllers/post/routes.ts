import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findPost } from './find-post'
import { update } from './update'
import { findAllPosts } from './find-all-posts'
import { deletePost } from './delete'
import { searchPost } from './search-post'
import { postSchemas } from '@/http/schemas/swagger/post-swagger'

export async function postRoutes(app: FastifyInstance) {
  app.get('/posts', {
    schema: {
      tags: ['Posts'],
      summary: 'Buscar todos os posts'
    },
    handler: findAllPosts
  });

  app.get('/posts/:id', {
    schema: {
      tags: ['Posts'],
      summary: 'Buscar post por ID',
      params: postSchemas.postParams,
    },
    handler: findPost,
  });

  app.get('/posts/search/:search', {
    schema: {
      tags: ['Posts'],
      summary: 'Buscar posts por texto',
      params: postSchemas.searchParams,
    },
    handler: searchPost,
  });

  app.post('/posts', {
    schema: {
      tags: ['Posts'],
      summary: 'Criar um post',
      body: postSchemas.createPostBody,
    },
    handler: create,
  });

  app.put('/posts/:id', {
    schema: {
      tags: ['Posts'],
      summary: 'Editar um post',
      body: postSchemas.updatePostBody,
    },
    handler: update
  });

  app.delete('/posts/:id', {
    schema: {
      tags: ['Posts'],
      summary: 'Deletar um post',
      params: postSchemas.deleteParams,
    },
    handler: deletePost
  });
}
