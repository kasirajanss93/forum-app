import Server from "../server";
import "mocha";
import TestFactory from "./testFactory";
import { Post } from "../entity/Post";
import { expect } from "chai";

describe("API integration tests", () => {
  const factory: TestFactory = new TestFactory();
  before(async () => {
    await factory.init();
  });

  after(async () => {
    await factory.connection.getRepository(Post).clear();
    await factory.close();
  });

  const postData = {
    user: "example@example.com",
    content: "Example content",
  };

  describe("POST /posts", () => {
    it("responds with new posts", (done) => {
      factory.app
        .post("/posts")
        .send(postData)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;
            const post: Post = res.body;
            expect(post.user).to.equal("example@example.com");
            expect(post.content).to.equal("Example content");
            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });

  describe("GET /posts", () => {
    it("respond with 200 status", (done) => {
      factory.app
        .get("/posts")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;
            const posts: Post[] = res.body;
            expect(posts[0].user).to.equal("example@example.com");
            expect(posts[0].content).to.equal("Example content");
            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });

  describe("GET /posts/:id", () => {
    it("respond with 200 status", (done) => {
      let id;
      factory.app
        .get("/posts")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;
            const posts: Post[] = res.body;
            id = posts[0].id;
            factory.app
              .get("/posts/" + id)
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(200)
              .end((err, res) => {
                try {
                  if (err) throw err;
                  const post: Post = res.body;
                  expect(post.user).to.equal("example@example.com");
                  expect(post.content).to.equal("Example content");
                  return done();
                } catch (err) {
                  return done(err);
                }
              });
          } catch (err) {
            return done(err);
          }
        });
    });
  });

  describe("DELETE /posts/:id", () => {
    it("respond with 200 status", (done) => {
      let id;
      factory.app
        .get("/posts")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;
            const posts: Post[] = res.body;
            id = posts[0].id;
            factory.app
              .delete("/posts/" + id)
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(204)
              .end((err, res) => {
                try {
                  if (err) throw err;
                  return done();
                } catch (err) {
                  return done(err);
                }
              });
          } catch (err) {
            return done(err);
          }
        });
    });
  });
});
