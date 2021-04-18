import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import upload from "@config/upload";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import "../../container";

import AppError from "@shared/errors/AppError";

import swaggerFile from "../../../swagger.json";
import createConnection from "../typeorm/database";
import rateLimiter from "./middlewares/rateLimiter";
import router from "./routes";

createConnection();
const server = express();

server.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app: server }),
  ],

  tracesSampleRate: 1.0,
});

server.use(Sentry.Handlers.requestHandler());
server.use(Sentry.Handlers.tracingHandler());

server.use(express.json());

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
server.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
server.use("/cars", express.static(`${upload.tmpFolder}/cars`));

server.use(cors());
server.use(router);

server.use(Sentry.Handlers.errorHandler());

server.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "Error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export default server;
