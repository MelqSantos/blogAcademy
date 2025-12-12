import { PersonRepository } from '@/repositories/pg/person.repository'
import { UserRepository } from '@/repositories/pg/user.repository'
import { DeleteUserUseCase } from '../delete-user'

export function makeDeleteUserUseCase() {
  const userRepository = new UserRepository()
  const personRepository = new PersonRepository()
  const useCase = new DeleteUserUseCase(userRepository, personRepository)

  return useCase
}