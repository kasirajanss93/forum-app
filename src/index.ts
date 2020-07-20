import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import express from "express";
import Server from "./server";
import { createServer, Server as HttpServer } from "http";

createConnection()
  .then(async (connection) => {
    // create express app

    const app: express.Application = new Server().app;

    // start express server
    app.listen(3000);
    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
  })
  .catch((error) => console.log(error));
