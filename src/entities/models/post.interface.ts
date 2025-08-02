export interface IPost {
  id?: string
  title: string
  content: string
  subject: string
  createdAt: Date
  updatedAt: Date
  author_id?: number
}
