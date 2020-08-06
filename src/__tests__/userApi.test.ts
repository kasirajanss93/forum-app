import Server from "../server";
import "mocha";
import TestFactory from "./testFactory";
import { User } from "../entity/User";
import { expect } from "chai";

describe("API integration tests", () => {
  const factory: TestFactory = new TestFactory();
  before(async () => {
    await factory.init();
  });

  after(async () => {
    await factory.connection.getRepository(User).clear();
    await factory.close();
  });

  const userData = {
    name: "Christian Bale",
    username: "christian.bale",
    first_name: "Christian",
    last_name: "Bale"
  };

  describe("POST /users", () => {
    it("responds with new user", done => {
      factory.app
        .post("/users")
        .send(userData)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;
            const user: User = res.body;
            expect(user.name).to.equal("Christian Bale");
            expect(user.username).to.equal("christian.bale");
            expect(user.first_name).to.equal("Christian");
            expect(user.last_name).to.equal("Bale");
            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });

  describe("GET /users", () => {
    it("respond with 200 status", done => {
      factory.app
        .get("/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;
            const users: User[] = res.body;
            expect(users[0].name).to.equal("Christian Bale");
            expect(users[0].username).to.equal("christian.bale");
            expect(users[0].first_name).to.equal("Christian");
            expect(users[0].last_name).to.equal("Bale");
            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });

  describe("GET /users/:id", () => {
    it("respond with 200 status", done => {
      let id;
      factory.app
        .get("/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;
            const user: User[] = res.body;
            id = user[0].id;
            factory.app
              .get("/users/" + id)
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(200)
              .end((err, res) => {
                try {
                  if (err) throw err;
                  const user: User = res.body;
                  expect(user.name).to.equal("Christian Bale");
                  expect(user.username).to.equal("christian.bale");
                  expect(user.first_name).to.equal("Christian");
                  expect(user.last_name).to.equal("Bale");
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

  describe("DELETE /user/:id", () => {
    it("respond with 204 status", done => {
      let id;
      factory.app
        .get("/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;
            const users: User[] = res.body;
            id = users[0].id;
            factory.app
              .delete("/users/" + id)
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
