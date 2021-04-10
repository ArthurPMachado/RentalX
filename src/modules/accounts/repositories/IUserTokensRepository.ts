import ICreateUserTokenDTO from "../dtos/ICreateUserTokenDTO";
import UserTokens from "../infra/typeorm/models/UserTokens";

interface IUserTokensRepository {
  create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens>;
}

export default IUserTokensRepository;
