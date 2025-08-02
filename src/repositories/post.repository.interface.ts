import { IPost } from '@/entities/models/post.interface'

export interface IPostRepository {
  findAll(): Promise<IPost[]>
  findById(id: string): Promise<IPost | null>
  create(post: IPost): Promise<IPost | undefined>
  update(post: IPost): Promise<IPost>
  delete(id: string): Promise<void>
}
