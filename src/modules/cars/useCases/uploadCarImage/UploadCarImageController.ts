import { Request, Response } from "express";
import { container } from "tsyringe";

import UploadCarImageUseCase from "./UploadImageUseCase";

interface IFiles {
  filename: string;
}

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadImageUseCase = container.resolve(UploadCarImageUseCase);

    const images_name = images.map((file) => file.filename);

    await uploadImageUseCase.execute({
      car_id: id,
      images_name,
    });

    return response.status(201).send();
  }
}

export default UploadCarImageController;
