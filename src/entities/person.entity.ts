import { IPerson } from './models/person.interface'

export class Person implements IPerson {
  id?: number
  name: string
  birth: string | Date
  email: string
  user_id?: number

  constructor(name: string, birth: string | Date, email: string) {
    this.name = name
    this.birth = birth
    this.email = email
  }
}
