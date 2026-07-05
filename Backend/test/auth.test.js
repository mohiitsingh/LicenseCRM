// tests/auth.test.js

const request = require("supertest");
const app = require("../src/app");

describe("Auth APIs", () => {
  describe("POST /api/auth/register", () => {
    it("should register a user", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          name: "John",
          email: "john@test.com",
          password: "123456",
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBeDefined();
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login successfully", async () => {
      await request(app)
        .post("/api/auth/register")
        .send({
          name: "John",
          email: "john@test.com",
          password: "123456",
        });

      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "john@test.com",
          password: "123456",
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBeDefined();
    });
  });
});