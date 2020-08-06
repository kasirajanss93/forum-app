import * as typeorm from "typeorm";
import { User } from "../../entity/User";
import { createStubInstance, createSandbox, SinonSandbox, stub } from "sinon";
import * as chai from "chai";
import sinonChai from "sinon-chai";
import * as express from "express";
import * as sinon from "sinon";
import { expect } from "chai";
import { UserController } from "../UserController";

chai.use(sinonChai);

describe("User Controller", () => {
  let sandbox: SinonSandbox;

  function mockRepository() {
    const repository = createStubInstance(typeorm.Repository);
    const connectionManager = createStubInstance(typeorm.ConnectionManager);
    const connection = createStubInstance(typeorm.Connection);
    connectionManager.get.returns(connection as any);
    connection.getRepository.returns(repository as any);
    sandbox
      .stub(typeorm, "getConnectionManager")
      .returns(connectionManager as any);
    return repository;
  }

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("Should retrive all the user data", async () => {
    const userData: User[] = [
      {
        id: 1,
        name: "Christian Bale",
        username: "christian.bale",
        first_name: "Christian",
        last_name: "Bale"
      },
      {
        id: 2,
        name: "Harvey Specter",
        username: "hhrvey.specter",
        first_name: "Harvey",
        last_name: "Specter"
      }
    ];

    const repository = mockRepository();
    repository.find.returns(Promise.resolve(userData));
    const func: any = {};
    const res = {
      send: sinon.spy()
    };
    const userController = new UserController();
    await userController.all(func, res as any, func);

    expect(res.send).to.be.calledOnceWith(userData);
    expect(repository.find).to.be.calledOnce;
  });

  it("Should retrive the correct user data on findOne", async () => {
    const userData: User = {
      id: 1,
      name: "Christian Bale",
      username: "christian.bale",
      first_name: "Christian",
      last_name: "Bale"
    };

    const repository = mockRepository();
    repository.findOne
      .withArgs(sinon.match(1))
      .returns(Promise.resolve(userData));

    const userController = new UserController();
    const res: any = { send: sinon.spy() };
    const request: any = {
      params: { id: 1 }
    };
    await userController.one(request, res, () => {});
    expect(res.send).to.be.calledOnceWith(userData);
    expect(repository.findOne).to.be.calledOnce;
  });

  it("Should save the correct user data on save", async () => {
    const userData: User = {
      id: 1,
      name: "Christian Bale",
      username: "christian.bale",
      first_name: "Christian",
      last_name: "Bale"
    };

    const repository = mockRepository();
    repository.save
      .withArgs(sinon.match(userData))
      .returns(Promise.resolve(userData));

    const userController = new UserController();
    const res: any = { send: sinon.spy() };
    const request: any = {
      body: userData
    };
    const result = await userController.save(request, res, () => {});
    expect(res.send).to.be.calledOnceWith(userData);
    expect(repository.save).to.be.calledOnce;
  });

  it("Should remove the correct user data on delete", async () => {
    const userData: User = {
      id: 1,
      name: "Christian Bale",
      username: "christian.bale",
      first_name: "Christian",
      last_name: "Bale"
    };

    const repository = await mockRepository();
    repository.findOne
      .withArgs(sinon.match(1))
      .returns(Promise.resolve(userData));
    repository.remove
      .withArgs(sinon.match(userData))
      .returns(Promise.resolve({}));

    const userController = new UserController();

    const request: any = {
      params: { id: 1 }
    };
    const res = {
      status: () => res,
      send: sinon.spy()
    };
    await userController.remove(request, res as any, () => {});
    expect(repository.remove).calledOnceWithExactly(userData);
    expect(res.send).to.be.calledOnce;
  });
});
