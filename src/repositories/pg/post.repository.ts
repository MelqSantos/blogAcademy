import { IPost } from '@/entities/models/post.interface'
import { database } from '@/lib/pg/db'
import { IPostRepository } from '../post.repository.interface'

export class PostRepository implements IPostRepository {

  async findAll(): Promise<IPost[]> {
    const result = await database.clientInstance?.query<IPost>(
      `SELECT po.*, pe.name AS author
         FROM "post" po
         LEFT JOIN "user" u ON po.author_id = u.id
         LEFT JOIN "person" pe ON u.id = pe.user_id
         ORDER BY po.updatedat DESC`,
    )

    return result?.rows || []
  }

  async findById(id: string): Promise<IPost | null> {
    const result = await database.clientInstance?.query<IPost>(
      `SELECT * FROM "post" WHERE "post".id = $1`,
      [id],
    )
    return result?.rows[0] || null
  }

  async findbyText(search: string): Promise<IPost[]> {
    const result = await database.clientInstance?.query<IPost>(
      `SELECT * FROM "post" WHERE title ILIKE $1 OR content ILIKE $1 OR subject ILIKE $1`,
      [`%${search}%`],
    )
    return result?.rows || []
  }

  async create({
    title,
    content,
    subject,
    createdAt,
    updatedAt,
    author_id,
  }: IPost): Promise<IPost | undefined> {
    const result = await database.clientInstance?.query<IPost>(
      `
      INSERT INTO "post" (title, content, subject, createdAt, updatedAt, author_id) VALUES 
      ($1, $2, $3, $4, $5, $6) RETURNING *
    `,
      [title, content, subject, createdAt, updatedAt, author_id],
    )

    return result?.rows[0]
  }

  async update(post: IPost): Promise<IPost> {
    const result = await database.clientInstance?.query<IPost>(
      `
      UPDATE "post" 
      SET title = $1, content = $2, subject = $3, updatedAt = $4, author_id = $5 
      WHERE id = $6 RETURNING *
    `,
      [post.title, post.content, post.subject, post.updatedAt, post.author_id, post.id],
    )

    return result?.rows[0] || post
  }

  async delete(id: string): Promise<void> {
    await database.clientInstance?.query(
      `DELETE FROM "post" WHERE id = $1`,
      [id],
    )
  }


}
