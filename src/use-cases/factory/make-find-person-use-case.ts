import { PersonRepository } from "@/repositories/pg/person.repository"
import { FindPersonUseCase } from "../find-person"

export function makeFindPersonUseCase() {
  const personRepository = new PersonRepository()

  const findPersonUseCase = new FindPersonUseCase(personRepository)

  return findPersonUseCase
}