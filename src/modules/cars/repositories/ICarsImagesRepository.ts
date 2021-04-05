import CarImage from "../infra/typeorm/models/CarImage";

interface ICarsImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
}

export default ICarsImagesRepository;
