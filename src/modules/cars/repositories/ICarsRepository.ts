import ICreateCarDTO from "../dtos/ICreateCarDTO";
import Car from "../infra/typeorm/models/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<void>;
  findByLicensePlate(license_plate: string): Promise<Car>;
}

export default ICarsRepository;
