import Rental from "@modules/rentals/infra/typeorm/models/Rental";

import IRentalsRepository from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const car = this.rentals.find(
      (rental) => rental.car_id === car_id && rental.end_date === null
    );
    return car;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const user = this.rentals.find(
      (rental) => rental.user_id === user_id && rental.end_date === null
    );
    return user;
  }
}

export default RentalsRepositoryInMemory;
