import express from "express";

const server = express();

server.get("/", (request, response) =>
  response.json({ message: "Hello World" })
);

server.listen(3030, () => "Server is running");
