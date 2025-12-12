import { PersonRepository } from '@/repositories/pg/person.repository'
import { UserRepository } from '@/repositories/pg/user.repository'
import { UpdateUserUseCase } from '../update-user'

export function makeUpdateUserUseCase() {
  const userRepository = new UserRepository()
  const personRepository = new PersonRepository()
  const useCase = new UpdateUserUseCase(userRepository, personRepository)

  return useCase
}