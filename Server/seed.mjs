// seed.js
import mongoose from "mongoose";
import User from "./src/models/User.mjs";
import Article from "./src/models/Article.mjs";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/knowledge-platform";

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await User.deleteMany();
    await Article.deleteMany();

    // Create sample users
    const users = await User.insertMany([
      {
        name: "Admin",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "user",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "mypassword",
        role: "user",
      },
    ]);

    console.log("✅ Users seeded");

    // Create sample articles
    const articles = [
      {
        title: "The Future of JavaScript",
        content: `JavaScript, the cornerstone of modern web development, has evolved rapidly over the past two decades. With the continuous development of ECMAScript standards, JavaScript is now more powerful and expressive than ever. From async/await to ES modules, developers are leveraging new language features to build scalable and maintainable applications. The future promises even more innovation, including records and tuples, pipeline operators, and pattern matching — all of which are in various stages of TC39 proposal.`,
        createdBy: users[1]._id,
        summary: "An article discussing future trends in JavaScript.",
        revisions: [
          {
            title: "The Future of JavaScript (v1)",
            content: "Initial draft of the article.",
          },
          {
            title: "The Future of JavaScript (v2)",
            content: "Added more details about ECMAScript proposals.",
          },
        ],
      },
      {
        title: "Understanding Async/Await",
        content:
          "Asynchronous programming is essential for non-blocking operations in JavaScript. Traditionally, callbacks and promises were used to handle asynchronous code, but they often led to complex and unreadable code. Async/await, introduced in ES2017, revolutionized how developers write asynchronous logic.",
        createdBy: users[2]._id,
        summary: "Explains how async/await works in JavaScript.",
        revisions: [
          {
            title: "Understanding Async/Await (v1)",
            content: "Initial explanation with examples.",
          },
        ],
      },
    ];

    await Article.insertMany(articles);

    console.log("✅ Articles seeded");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

seedDatabase();
