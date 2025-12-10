import { IPersonRepository } from '@/repositories/person.repository.interface'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class FindPersonByRoleUseCase {
  constructor(private personRepository: IPersonRepository) {}

  async handler(role: string) {
    const person = await this.personRepository.findWithUserByRole(role)

    if (!person) throw new ResourceNotFoundError()

    return person
  }
}
