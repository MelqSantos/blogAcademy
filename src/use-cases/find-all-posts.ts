import { IPostRepository } from "@/repositories/post.repository.interface";

export class FindAllPostsUseCase {
  constructor(private postRepository: IPostRepository) {}

  async handler() {
    return this.postRepository.findAll()
  }
}
