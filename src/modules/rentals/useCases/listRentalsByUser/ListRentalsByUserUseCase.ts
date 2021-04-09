/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import Rental from "@modules/rentals/infra/typeorm/models/Rental";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) { }

  async execute(user_id): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

    return rentalsByUser;
  }
}

export default ListRentalsByUserUseCase;
