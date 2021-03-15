import express from "express";

const server = express();

server.get("/", (request, response) =>
  response.json({ message: "Hello World Ignite" })
);

server.listen(3030, () => console.log("Server is running"));
