import express, { NextFunction } from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";

export default class Server {
  private readonly _app: express.Application = express();
  constructor() {
    this._app.use(bodyParser.json());

    // register express routes from defined application routes
    this.initRoutes();
  }

  public get app(): express.Application {
    return this._app;
  }

  private initRoutes() {
    Routes.forEach(route => {
      this._app[route.method](
        route.route,
        (req: Request, res: Response, next: NextFunction) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          result.then(() => next).catch(err => next(err));
        }
      );
    });
  }
}
