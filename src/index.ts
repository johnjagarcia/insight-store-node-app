import * as dotenv from "dotenv";
dotenv.config();
import { App } from "./app";
import * as path from "path";
import { createConnection } from "typeorm";
import entities from "./shared/entities";

export const createApp = async () => {
  await createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [...entities],
    logging: Boolean(process.env.DB_LOGGING),
  });

  const app = new App();

  const swaggerPath = path.join(__dirname, "../swagger/");

  await app.create({
    folders: [
      {
        alias: "/",
        path: path.join(__dirname, "../static"),
      },
      {
        alias: "swagger",
        path: swaggerPath,
      },
    ],
  });

  process.env.APP_URL = "http://localhost:4000";

  await app.initSwagger();

  return app;
};
if (process.env.NODE_ENV !== "test") {
  createApp()
    .then((app) => {
      app.logger.debug(
        `Your fort is located at address - ${process.env.APP_URL}`
      );
    })
    .catch((err) => {
      console.error(err);
    });
}
