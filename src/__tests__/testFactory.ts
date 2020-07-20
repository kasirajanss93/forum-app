import "reflect-metadata";

import { createConnection, ConnectionOptions, Connection } from "typeorm";
import Server from "../server";
import express from "express";
import supertest from "supertest";
import { createServer, Server as HttpServer } from "http";

export default class TestFactory {
  private _app: express.Application;
  private _connection: Connection;
  private _server: HttpServer;

  public get app(): supertest.SuperTest<supertest.Test> {
    return supertest(this._app);
  }

  public get connection(): Connection {
    return this._connection;
  }

  public get server(): HttpServer {
    return this._server;
  }

  public async init(): Promise<void> {
    // logger.info('Running startup for test case');
    await this.startup();
  }

  /**
   * Close server and DB connection
   */
  public async close(): Promise<void> {
    this._server.close();
    this._connection.close();
  }

  /**
   * Connect to DB and start server
   */
  private async startup(): Promise<void> {
    this._connection = await createConnection(process.env.NODE_ENV);
    this._app = new Server().app;
    this._server = createServer(this._app).listen(process.env.NODE_PORT);
  }
}
