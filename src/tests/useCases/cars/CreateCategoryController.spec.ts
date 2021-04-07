import request from "supertest";

import server from "@shared/infra/http/server";

describe("Create Category Controller", () => {
  it("Should be able to create a new category", async () => {
    const response = await request(server).post("/categories").send({
      name: "Category supertest",
      description: "Category supertest",
    });

    expect(response.status).toBe(201);
  });
});
