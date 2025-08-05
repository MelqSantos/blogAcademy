import { IPostRepository } from '@/repositories/post.repository.interface'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class SearchPostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async handler(search: string) {
    const post = await this.postRepository.findbyText(search)

    if (!post) throw new ResourceNotFoundError()

    return post
  }
}
