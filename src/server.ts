import express from "express";

import categoriesRoutes from "./routes/categories.routes";
import specificationRoutes from "./routes/specifications.routes";

const server = express();

server.use(express.json());

server.use("/categories", categoriesRoutes);
server.use("/specifications", specificationRoutes);

server.listen(3030, () => console.log("Server is running"));
