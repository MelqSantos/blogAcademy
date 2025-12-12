import { IUserRepository } from "@/repositories/user.repository.interface";

export class FindAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async handler() {
    return this.userRepository.findAll()
  }
}
