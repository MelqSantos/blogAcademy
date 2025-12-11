import { PersonRepository } from '@/repositories/pg/person.repository'
import { UserRepository } from '@/repositories/pg/user.repository'
import { CreateUserUseCase } from '../create-user'

export function makeCreateUserUseCase() {
  const userRepository = new UserRepository()
  const personRepository = new PersonRepository()
  const createUserUseCase = new CreateUserUseCase(userRepository, personRepository)

  return createUserUseCase
}
