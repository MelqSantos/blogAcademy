import { database } from '@/lib/pg/db'
import { IUserRepository } from '../user.repository.interface'
import { IUser } from '@/entities/models/user.interface'
import { IPerson } from '@/entities/models/person.interface'

export class UserRepository implements IUserRepository {
  async findByUsername(username: string): Promise<IUser | undefined> {
    const result = await database.clientInstance?.query<IUser>(
      `SELECT * FROM "user" WHERE "user".username = $1`,
      [username],
    )

    return result?.rows[0]
  }

  async findAll(): Promise<IUser[] | undefined> {
    const result = await database.clientInstance?.query<IUser>(
      `SELECT u.id, u.username, u."role", p."name", p.email, p.birth
        FROM "user" u 
       LEFT JOIN person p ON u.id = p.user_id`,
    )

    return result?.rows || [];
  }

  public async create({
    username,
    password,
    role
  }: Omit<IUser, 'id'>): Promise<IUser | undefined> {
    const result = await database.clientInstance?.query<IUser>(
      `INSERT INTO "user" (username, password, role) VALUES ($1, $2, $3) RETURNING *`,
      [username, password, role],
    )

    return result?.rows[0]
  }

  public async update(
    userId: number,
    data: Partial<Omit<IUser, 'id'>>,
  ): Promise<IUser | undefined> {
    const fields = Object.keys(data)
      .map((key, index) => `"${key}" = $${index + 2}`)
      .join(', ')

    const values = Object.values(data)

    if (fields.length === 0) {
      return this.findWithPerson(userId)
    }

    const query = `UPDATE "user" SET ${fields} WHERE id = $1 RETURNING *`

    const result = await database.clientInstance?.query<IUser>(query, [
      userId,
      ...values,
    ])

    return result?.rows[0]
  }

  public async findWithPerson(
    userId: number,
  ): Promise<(IUser & IPerson) | undefined> {
    const result = await database.clientInstance?.query(
      `SELECT * FROM "user" 
       LEFT JOIN person ON "user".id = person.user_id
       WHERE "user".id = $1`,
      [userId],
    )
    return result?.rows[0]
  }

  public async delete(userId: number): Promise<void> {
    await database.clientInstance?.query(
      `DELETE FROM "user" WHERE id = $1`,
      [userId],
    )
  }
}
