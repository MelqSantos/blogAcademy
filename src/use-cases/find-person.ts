import { IPersonRepository } from '@/repositories/person.repository.interface'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class FindPersonUseCase {
  constructor(private personRepository: IPersonRepository) {}

  async handler(id_user: number) {
    const person = await this.personRepository.findWithUserByUserId(id_user)

    if (!person) throw new ResourceNotFoundError()

    return person
  }
}
