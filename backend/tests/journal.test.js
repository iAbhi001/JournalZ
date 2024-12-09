const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const Journal = require("../models/Journal");
const User = require("../models/User");
const bcrypt = require("bcrypt");

describe("Journal Management", () => {
  let token;

  beforeAll(async () => {
    // Connect to the test database
    const mongoURI = process.env.MONGO_URI_Test || "mongodb://127.0.0.1:27017/test-db";
    await mongoose.connect(mongoURI);

    // Cleanup users and journals to ensure a clean state
    await User.deleteMany({});
    await Journal.deleteMany({});

    // Create and log in the test user
    const testUser = new User({
      name: "Test User",
      email: "hi@ex.com",
      password: await bcrypt.hash("1234", 10),
    });
    await testUser.save();

    const res = await request(app).post("/api/users/login").send({
      email: testUser.email,
      password: "1234",
    });

    token = res.body.token; // Store token for use in tests
    console.log("Token:", token); // Debug token
  });

  afterAll(async () => {
    // Cleanup database and disconnect
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  it("should create a new journal", async () => {
    const res = await request(app)
      .post("/api/journals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Journal",
        content: "This is a test journal.",
        category: "Personal",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("title", "Test Journal");
  });

  it("should fetch all journals", async () => {
    const res = await request(app)
      .get("/api/journals")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.journals).toBeDefined();
    expect(res.body.journals.length).toBeGreaterThan(0);
  });

  it("should delete a journal", async () => {
    const user = await User.findOne({ email: "hi@ex.com" });
    
    const journal = await Journal.create({
      title: "Test Journal to Delete",
      content: "This journal will be deleted.",
      category: "Personal",
      user: user._id,
    });

    const res = await request(app)
      .delete(`/api/journals/${journal._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Journal deleted successfully.");
  });
});
