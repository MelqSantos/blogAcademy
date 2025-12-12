import { database } from '@/lib/pg/db'
import { IPersonRepository } from '../person.repository.interface'
import { IPerson } from '@/entities/models/person.interface'
import { IUser } from '@/entities/models/user.interface'

export class PersonRepository implements IPersonRepository {
  async create({
    name,
    birth,
    email,
    user_id,
  }: IPerson): Promise<IPerson | undefined> {
    const result = await database.clientInstance?.query(
      'INSERT INTO person (name, birth, email, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, birth, email, user_id],
    )

    return result?.rows[0]
  }

  async updateByUserId(
    user_id: number,
    data: Partial<Omit<IPerson, 'id' | 'user_id'>>,
  ): Promise<IPerson | undefined> {
    const fields = Object.keys(data)
      .map((key, index) => `"${key}" = $${index + 2}`)
      .join(', ')

    const values = Object.values(data)

    if (fields.length === 0) {
      const person = await this.findWithUserByUserId(user_id)
      if (person) return person
      return undefined
    }

    const query = `UPDATE person SET ${fields} WHERE user_id = $1 RETURNING *`

    const result = await database.clientInstance?.query<IPerson>(query, [
      user_id,
      ...values,
    ])

    return result?.rows[0]
  }

  async findWithUserByUserId(
    user_id: number,
  ): Promise<(IPerson & IUser) | undefined> {
    const result = await database.clientInstance?.query(
      `SELECT 
        p.id, p.name, p.birth, p.email, p.user_id,
        u.id as user_id_from_user, u.username, u.role
       FROM 
        person p
       LEFT JOIN 
        "user" u ON p.user_id = u.id
       WHERE p.user_id = $1`,
      [user_id],
    )
    return result?.rows[0]
  }

  async findWithUserByRole(
    role: string,
  ): Promise<(IPerson & IUser)[]> {
    const result = await database.clientInstance?.query(
      `SELECT 
        p.id, p.name, p.birth, p.email,
        u.id as user_id, u.username, u.role
       FROM 
        person p
       LEFT JOIN 
        "user" u ON p.user_id = u.id
       WHERE u.role ILIKE $1`,
      [role],
    )
    return result?.rows || []
  }

  async deleteByUserId(user_id: number): Promise<void> {
    await database.clientInstance?.query(
      'DELETE FROM person WHERE user_id = $1',
      [user_id],
    )
  }
}
