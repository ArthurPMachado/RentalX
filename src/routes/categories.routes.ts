import { Router } from "express";
import { v4 as uuidV4 } from "uuid";

import Category from "../models/Category";

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const category: Category = {
    name,
    description,
    id: uuidV4(),
    created_at: new Date(),
  };

  categories.push(category);

  return response.status(201).send();
});

export default categoriesRoutes;
