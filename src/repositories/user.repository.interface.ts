import { IUser } from '@/entities/models/user.interface'
import { IPerson } from '@/entities/models/person.interface'

export interface IUserRepository {
  findWithPerson(userId: number): Promise<(IUser & IPerson) | undefined>
  findByUsername(username: string): Promise<IUser | undefined>
  findAll(): Promise<IUser[] | undefined>
  create(user: Omit<IUser, 'id'>): Promise<IUser | undefined>
  update(userId: number, data: Partial<Omit<IUser, 'id'>>): Promise<IUser | undefined>
  delete(userId: number): Promise<void>
}
