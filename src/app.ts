import "reflect-metadata";
import { Fort, MustacheViewEngine } from "fortjs";
import { routes } from "./routes";
import { Swagger } from "fortjs-swagger";
import * as path from "path";

export class App extends Fort {
  constructor() {
    super();
    this.routes = routes;
    this.viewEngine = MustacheViewEngine;
  }

  async initSwagger() {
    await new Swagger().create({
      appInfo: {
        title: "Swagger Insight Store",
        description: "Swagger Insight Store API",
        version: "1.0",
      },
      servers: [
        {
          description: "local",
          url: "http://localhost:4000",
        },
      ],
      outputPath: path.join(__dirname, "../swagger/"),
    });
  }
}
