import * as typeorm from "typeorm";
import { Post } from "../../entity/Post";
import { createStubInstance, createSandbox, SinonSandbox, stub } from "sinon";
import { PostController } from "../postController";
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
      const spyOnSave = sandbox.spy(() => Promise.resolve(postData));
      sandbox.stub(typeorm, "getRepository").returns({ find: postData } as any);
      const res: any = {};

      const postController = new PostController();
      const result = await postController.all(res, res, res);

      chai.expect(result).equal(postData);
      chai.expect(spyOnSave.callCount).equal(1);
    });
  });
});
