import ICreateUserTokenDTO from "../dtos/ICreateUserTokenDTO";
import UserTokens from "../infra/typeorm/models/UserTokens";

interface IUserTokensRepository {
  create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}

export default IUserTokensRepository;
