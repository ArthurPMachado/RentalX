import { Router } from "express";

import CategoriesRepository from "../modules/cars/repositories/CategoriesRepository";
import createCategoryController from "../modules/cars/useCases/createCategory";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) =>
  createCategoryController.handle(request, response)
);

categoriesRoutes.get("/", (request, response) => {
  const listAll = categoriesRepository.listAll();

  return response.json(listAll);
});

export default categoriesRoutes;
