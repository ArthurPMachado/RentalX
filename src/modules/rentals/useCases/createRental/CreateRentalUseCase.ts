/* eslint-disable prettier/prettier */
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { inject, injectable } from "tsyringe";

import Rental from "@modules/rentals/infra/typeorm/models/Rental";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import AppError from "@shared/errors/AppError";

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

// @injectable()
class CreateRentalUseCase {

  constructor(
    // @inject()
    private rentalsRepository: IRentalsRepository) { }

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumRentalHours = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!");
    }

    const expectedReturnDateFormat = dayjs(expected_return_date)
      .utc()
      .local()
      .format();

    const dateNow = dayjs().utc().local().format()

    const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hours");

    if (compare < minimumRentalHours) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    });

    return rental;
  }
}

export default CreateRentalUseCase;
