import { getRepository, Repository } from "typeorm";

import ICreateUserTokenDTO from "@modules/accounts/dtos/ICreateUserTokenDTO";
import IUserTokensRepository from "@modules/accounts/repositories/IUserTokensRepository";

import UserTokens from "../models/UserTokens";

class UsersTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}

export default UsersTokensRepository;
