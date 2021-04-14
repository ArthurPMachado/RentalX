import { classToClass } from "class-transformer";

import IUserResponseDTO from "../dtos/IUserResponseDTO";
import User from "../infra/typeorm/models/User";

class UserMap {
  static toDTO({
    name,
    email,
    id,
    driver_license,
    avatar,
    getAvatarUrl,
  }: User): IUserResponseDTO {
    const user = classToClass({
      name,
      email,
      id,
      driver_license,
      avatar,
      getAvatarUrl,
    });

    return user;
  }
}

export default UserMap;
