import { IPerson } from '@/entities/models/person.interface'
import { IUser } from '@/entities/models/user.interface'
import { IPersonRepository } from '@/repositories/person.repository.interface'
import { IUserRepository } from '@/repositories/user.repository.interface'

type CreateUserUseCaseRequest = Omit<IUser, 'id'> &
  Omit<IPerson, 'id' | 'user_id'>

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private personRepository: IPersonRepository,
  ) {}

  async handler(data: CreateUserUseCaseRequest): Promise<IUser | undefined> {
    const user = await this.userRepository.create({
      username: data.username,
      password: data.password,
      role: data.role,
    })

    if (user?.id) {
      await this.personRepository.create({
        name: data.name,
        birth: data.birth,
        email: data.email,
        user_id: user.id,
      })
    }
    return user
  }
}
