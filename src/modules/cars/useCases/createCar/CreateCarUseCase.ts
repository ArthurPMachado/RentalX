/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import ICarsRepository from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute(data: IRequest): Promise<void> {
    this.carsRepository.create({
      brand: data.brand,
      category_id: data.category_id,
      daily_rate: data.daily_rate,
      description: data.description,
      fine_amount: data.fine_amount,
      license_plate: data.license_plate,
      name: data.name
    })
  }
}

export default CreateCarUseCase;
