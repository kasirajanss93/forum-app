import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import Server from "./server";
createConnection()
  .then(async (connection) => {
    // create express app

    const app: express.Application = new Server().app;

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
  })
  .catch((error) => console.log(error));
