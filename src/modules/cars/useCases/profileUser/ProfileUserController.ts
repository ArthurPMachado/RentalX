import { Request, Response } from "express";
import { container } from "tsyringe";

import ProfilesUserUseCase from "./ProfileUserUseCase";

class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const profileUserUseCase = container.resolve(ProfilesUserUseCase);

    const user = await profileUserUseCase.execute(id);

    return response.json(user);
  }
}

export default ProfileUserController;
