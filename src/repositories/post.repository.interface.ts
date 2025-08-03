import { IPost } from '@/entities/models/post.interface'

export interface IPostRepository {
  findAll(): Promise<IPost[]>
  findById(id: string): Promise<IPost | null>
  findbyText(text: string): Promise<IPost[]>
  create(post: IPost): Promise<IPost | undefined>
  update(post: IPost): Promise<IPost>
  delete(id: string): Promise<void>
}
