import { IPost } from "./models/post.interface"

export class Post implements IPost {
  id?: string
  title: string
  content: string
  subject: string
  createdAt?: Date
  updatedAt: Date
  author_id?: number

  constructor(title: string, content: string, subject: string, createdAt: Date, updatedAt: Date) {
    this.title = title
    this.content = content
    this.subject = subject
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
