/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import Category from "@modules/cars/models/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";


@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository) { }

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.listAll();

    return categories;
  }
}

export default ListCategoriesUseCase;
