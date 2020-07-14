import Server from "../server";
import "mocha";
import chai from "chai";
import chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Index test", () => {
  it("Main page content", () => {
    return chai
      .request(new Server().app)
      .get("/test")
      .then((res) => {
        chai.expect(res.status).to.eq(200);
        chai.expect(res.text).to.eql("Hello World");
      });
  });
});
