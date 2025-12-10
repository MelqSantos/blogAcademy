import { PersonRepository } from "@/repositories/pg/person.repository"
import { FindPersonByRoleUseCase } from "../find-person-by-role"

export function makeFindPersonByRoleUseCase() {
  const personRepository = new PersonRepository()

  const findPersonByRoleUseCase = new FindPersonByRoleUseCase(personRepository)

  return findPersonByRoleUseCase
}