import express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";

export default class Server {
  private readonly _app: express.Application = express();
  constructor() {
    this._app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      this._app[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    this._app.get("/test", (req: Request, res: Response) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello World");
    });

    // start express server
    this._app.listen(3000);
  }

  public get app(): express.Application {
    return this._app;
  }
}
