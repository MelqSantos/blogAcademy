import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findPost } from './find-post'
import { update } from './update'
import { findAllPosts } from './find-all-posts'
import { deletePost } from './delete'
import { searchPost } from './search-post'

export async function postRoutes(app: FastifyInstance) {
  app.get('/posts', findAllPosts)
  app.get('/posts/:id', findPost)
  app.get('/posts/search/:text', searchPost)
  app.post('/posts', create)
  app.put('/posts/:id', update)
  app.delete('/posts/:id', deletePost)
}
