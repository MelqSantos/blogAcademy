import { IPerson } from '@/entities/models/person.interface'
import { IUser } from '@/entities/models/user.interface'

export interface IPersonRepository {
  create(person: IPerson): Promise<IPerson | undefined>
  updateByUserId(
    user_id: number,
    data: Partial<Omit<IPerson, 'id' | 'user_id'>>,
  ): Promise<IPerson | undefined>
  findWithUserByUserId(user_id: number): Promise<(IPerson & IUser) | undefined>
  findWithUserByRole(role: string): Promise<(IPerson & IUser)[]>
  deleteByUserId(user_id: number): Promise<void>
}
