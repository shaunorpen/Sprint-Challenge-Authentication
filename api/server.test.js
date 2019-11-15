const server = require("./server");
const request = require("supertest");
const db = require("../database/dbConfig");

const user = {
  username: "shaun",
  password: "1234"
};

beforeAll(async () => {
  await db("users").truncate();
  await db("sessions").truncate();
});

describe("POST /api/auth/register", () => {
  test("add a new user", () => {
    return request(server)
      .post("/api/auth/register")
      .send(user)
      .expect(201)
      .expect({ message: "1 user successfully created" });
  });
});

describe("POST /api/auth/login", () => {
  test("login as newly created user", async () => {
    return request(server)
      .post("/api/auth/login")
      .send(user)
      .expect(200)
      .expect({ message: "Welcome! You're logged in!" });
  });
});

describe("GET /api/jokes", () => {
  test("returns jokes for logged in user", async () => {});
});

describe("Get /api/auth/logout", () => {
  test("logged in user can log out", () => {
    return request(server)
      .get("/api/auth/logout")
      .expect(200)
      .expect(`"Goodbye! You're logged out."`);
  });
});
