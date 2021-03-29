import ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from "../models/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User>;
}

export default IUsersRepository;
