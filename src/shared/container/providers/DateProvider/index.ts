import { container } from "tsyringe";

import IDateProvider from "./IDateProvider";
import DayjsDateProvider from "./implementations/DayjsDateProvide";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);
