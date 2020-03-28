const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new ONG", async () => {
    const resp = await request(app)
      .post("/ongs")
      .send({
        name: "APAD",
        email: "contato@apad.com",
        whatsapp: "17996721581",
        city: "Rio do Sul",
        uf: "SC"
      });

    expect(resp.body).toHaveProperty("id");
    expect(resp.body.id).toHaveLength(8);
  });
});
