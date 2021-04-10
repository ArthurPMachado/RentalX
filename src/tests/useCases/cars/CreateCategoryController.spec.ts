import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import server from "@shared/infra/http/server";
import createConnection from "@shared/infra/typeorm/database";

let connection: Connection;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        VALUES('${id}', 'admin', 'admin@rentalx.com.br', '${password}', true, 'now()', 'XXXXXX')
      `
    );

    const responseToken = await request(server).post("/sessions").send({
      email: "admin@rentalx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    await request(server)
      .post("/categories")
      .send({
        name: "Category supertest",
        description: "Category supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new category", async () => {
    const responseToken = await request(server).post("/sessions").send({
      email: "admin@rentalx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(server)
      .post("/categories")
      .send({
        name: "Category test",
        description: "Category test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a new category with the same name", async () => {
    const responseToken = await request(server).post("/sessions").send({
      email: "admin@rentalx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    await request(server)
      .post("/categories")
      .send({
        name: "Category supertest",
        description: "Category supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(server)
      .post("/categories")
      .send({
        name: "Category supertest",
        description: "Category supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
