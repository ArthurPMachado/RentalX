import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import CreateCarController from "@modules/cars/useCases/createCar/CreateCarController";
import CreateCarSpecificationController from "@modules/cars/useCases/createCarSpecifiation/CreateCarSpecificationController";
import ListAvailableCarsController from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import UploadCarImageController from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";

import ensureAdmin from "../middlewares/ensureAdmin";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const uploadCarImage = multer(uploadConfig.upload("./tmp/cars"));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImage.array("images"),
  uploadCarImageController.handle
);

export default carsRoutes;
