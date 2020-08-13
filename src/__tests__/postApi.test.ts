import Server from "../server";
import "mocha";
import TestFactory from "./testFactory";
import { Post } from "../entity/Post";
import { expect } from "chai";
import { User } from "../entity/User";

describe("Post API integration tests", () => {
  const factory: TestFactory = new TestFactory();
  before(async () => {
    await factory.init();
  });

  after(async () => {
    await factory.connection
      .getRepository(User)
      .query('TRUNCATE "users" CASCADE');
    await factory.connection.getRepository(Post).clear();
    await factory.close();
  });
  //const date = Date.now();
  const postData = {
    content: "Example content",
    title: "Hello world",
    date: new Date().toISOString(),
    user: ""
  };

  describe("POST /posts", () => {
    it("responds with new posts", done => {
      const userData = {
        name: "Christian Bale",
        username: "christian.bale",
        first_name: "Christian",
        last_name: "Bale"
      };

      factory.app
        .post("/users")
        .send(userData)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          postData.user = res.body.id;
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
                expect(post.title).to.equal(postData.title);
                expect(post.content).to.equal(postData.content);
                expect(post.date).to.equal(postData.date);
                expect(post.user).to.equal(postData.user);
                return done();
              } catch (err) {
                return done(err);
              }
            });
        });
    });
  });

  describe("GET /posts", () => {
    it("respond with 200 status", done => {
      factory.app
        .get("/posts")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;
            const posts: Post[] = res.body;
            expect(posts[0].title).to.equal(postData.title);
            expect(posts[0].content).to.equal(postData.content);
            expect(posts[0].date).to.equal(postData.date);
            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });

  describe("GET /posts/:id", () => {
    it("respond with 200 status", done => {
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
                  expect(post.title).to.equal(postData.title);
                  expect(post.content).to.equal(postData.content);
                  expect(post.date).to.equal(postData.date);
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
    it("respond with 204 status", done => {
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
