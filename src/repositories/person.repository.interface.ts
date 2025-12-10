import { IPerson } from '@/entities/models/person.interface'
import { IUser } from '@/entities/models/user.interface'

export interface IPersonRepository {
  create(person: IPerson): Promise<IPerson | undefined>
  findWithUserByUserId(user_id: number): Promise<(IPerson & IUser) | undefined>
  findWithUserByRole(role: string): Promise<(IPerson & IUser)[]>
}
