import { IPostRepository } from '@/repositories/post.repository.interface'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class SearchPostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async handler(text: string) {
    const post = await this.postRepository.findbyText(text)

    if (!post) throw new ResourceNotFoundError()

    return post
  }
}
