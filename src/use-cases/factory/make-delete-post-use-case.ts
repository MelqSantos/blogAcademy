import { PostRepository } from '@/repositories/pg/post.repository'
import { DeletePostUseCase } from '../delete-post'

export function makeDeletePostUseCase() {
  const postRepository = new PostRepository()

  const deletePostUseCase = new DeletePostUseCase(postRepository)

  return deletePostUseCase
}
