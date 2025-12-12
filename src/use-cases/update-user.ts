import { IPerson } from '@/entities/models/person.interface'
import { IUser } from '@/entities/models/user.interface'
import { IPersonRepository } from '@/repositories/person.repository.interface'
import { IUserRepository } from '@/repositories/user.repository.interface'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateUserUseCaseRequest {
  userId: number
  userData: Partial<Omit<IUser, 'id' | 'password'>>
  personData: Partial<Omit<IPerson, 'id' | 'user_id'>>
}

type UpdateUserUseCaseResponse = IUser & IPerson

export class UpdateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private personRepository: IPersonRepository,
  ) {}

  async handler({
    userId,
    userData,
    personData,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.userRepository.findWithPerson(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    if (Object.keys(userData).length > 0) {
      await this.userRepository.update(userId, userData)
    }

    if (Object.keys(personData).length > 0) {
      await this.personRepository.updateByUserId(userId, personData)
    }

    const updatedUser = await this.userRepository.findWithPerson(userId)

    if (!updatedUser) {
      throw new ResourceNotFoundError()
    }

    return updatedUser
  }
}