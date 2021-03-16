import express from "express";

import categoriesRoutes from "./routes/categories.routes";

const server = express();

server.use(express.json());

server.use(categoriesRoutes);

server.listen(3030, () => console.log("Server is running"));
