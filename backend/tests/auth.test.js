const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");

describe("User Authentication", () => {
  beforeAll(async () => {
    const mongoURI = process.env.MONGO_URI_Test || "mongodb://127.0.0.1:27017/test-db";
    await mongoose.connect(mongoURI);
    await User.deleteMany({}); // Clean database
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/api/users/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "User created successfully.");
  });

  it("should not register a user with an existing email", async () => {
    const res = await request(app).post("/api/users/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "User already exists.");
  });

  it("should login with valid credentials", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not login with invalid credentials", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid email or password");
  });
});
