import { IPersonRepository } from '@/repositories/person.repository.interface'
import { IUserRepository } from '@/repositories/user.repository.interface'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class DeleteUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private personRepository: IPersonRepository,
  ) {}

  async handler(userId: number): Promise<void> {
    const user = await this.userRepository.findWithPerson(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    if (user.user_id) {
      await this.personRepository.deleteByUserId(userId)
    }
    
    await this.userRepository.delete(userId)
  }
}