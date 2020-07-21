import * as typeorm from "typeorm";
import { Post } from "../../entity/Post";
import { createStubInstance, createSandbox, SinonSandbox, stub } from "sinon";
import { PostController } from "../postController";
import * as chai from "chai";
import sinonChai from "sinon-chai";
import { Request } from "express";
import * as sinon from "sinon";
import { expect } from "chai";

chai.use(sinonChai);

describe("Post Controller", () => {
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

  it("Should retrive all the post data", async () => {
    const postData: Post[] = [
      {
        id: 1,
        content: "Hello world",
        user: "user"
      },
      {
        id: 2,
        content: "Hello world",
        user: "user"
      }
    ];

    const repository = mockRepository();
    repository.find.returns(Promise.resolve(postData));
    const res: any = {};

    const postController = new PostController();
    const result = await postController.all(res, res, res);

    chai.expect(result).equal(postData);
    expect(repository.find).to.be.calledOnce;
  });

  it("Should retrive the correct post data on findOne", async () => {
    const postData: Post = {
      id: 1,
      content: "Hello world",
      user: "user"
    };

    const repository = mockRepository();
    repository.findOne
      .withArgs(sinon.match(1))
      .returns(Promise.resolve(postData));

    const postController = new PostController();
    const res: any = {};
    const request: any = {
      params: { id: 1 }
    };
    const result = await postController.one(request, res, res);
    chai.expect(result).equal(postData);
    expect(repository.findOne).to.be.calledOnce;
  });

  it("Should save the correct post data on save", async () => {
    const postData: Post = {
      id: 1,
      content: "Hello world",
      user: "user"
    };

    const repository = mockRepository();
    repository.save
      .withArgs(sinon.match(postData))
      .returns(Promise.resolve(postData));

    const postController = new PostController();
    const res: any = {};
    const request: any = {
      body: postData
    };
    const result = await postController.save(request, res, res);
    chai.expect(result).equal(postData);
    expect(repository.save).to.be.calledOnce;
  });

  it("Should remove the correct post data on delete", async () => {
    const postData: Post = {
      id: 1,
      content: "Hello world",
      user: "user"
    };

    const repository = await mockRepository();
    repository.findOne
      .withArgs(sinon.match(1))
      .returns(Promise.resolve(postData));
    repository.remove
      .withArgs(sinon.match(postData))
      .returns(Promise.resolve({}));

    const postController = new PostController();
    const res: any = {};
    const request: any = {
      params: { id: 1 }
    };

    const result = await postController.remove(request, res, () => {});
    expect(repository.remove).calledOnceWithExactly(postData);
  });
});
