import * as typeorm from "typeorm";
import { Post } from "../../entity/Post";
import { createStubInstance, createSandbox, SinonSandbox, stub } from "sinon";
import { PostController } from "../PostController";
import * as chai from "chai";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

describe("Post Controller", () => {
  describe("all method", () => {
    let sandbox: SinonSandbox;

    beforeEach(() => {
      sandbox = createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("Should retrive all the user data", async () => {
      const postData: Post[] = [
        {
          id: 1,
          content: "Hello world",
          user: "user",
        },
        {
          id: 2,
          content: "Hello world",
          user: "user",
        },
      ];

      const fakeRepository = givenRepositoryStub(postData, sandbox);
      const res: any = {};

      const postController = new PostController();
      const result = await postController.all(res, res, res);

      chai.expect(result).equal(postData);
      chai.expect(fakeRepository.find).to.be.calledOnce;
    });
  });
});

function givenRepositoryStub(postData: Post[], sandbox: SinonSandbox) {
  const fakeRepository = createStubInstance(typeorm.Repository);
  const fakeConnection = createStubInstance(typeorm.Connection);
  fakeRepository.find.returns(postData as any);
  fakeConnection.getRepository.withArgs(Post).returns(fakeRepository as any);
  sandbox.stub(typeorm, "getConnection").returns(fakeConnection as any);
  return fakeRepository;
}
