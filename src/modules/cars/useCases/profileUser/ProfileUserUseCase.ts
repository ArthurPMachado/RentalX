/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import User from "@modules/accounts/infra/typeorm/models/User";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class ProfilesUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    return user;
  }
}

export default ProfilesUserUseCase;
