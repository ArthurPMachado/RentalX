/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import Car from "@modules/cars/infra/typeorm/models/Car";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository) { }

  async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
    const cars = this.carsRepository.findAvailable(brand, category_id, name);
    return cars;
  }
}

export default ListAvailableCarsUseCase;
