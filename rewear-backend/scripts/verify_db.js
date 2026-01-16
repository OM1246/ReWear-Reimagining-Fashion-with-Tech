import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import path from "path";
import { fileURLToPath } from "url";

// Config to load .env from parent dir
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const verifyUsers = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    const users = await User.find({});
    console.log(`\nFound ${users.length} users in the database:`);
    
    users.forEach((u) => {
      console.log(`-----------------------------------`);
      console.log(`ID:       ${u._id}`);
      console.log(`Name:     ${u.name}`);
      console.log(`Email:    ${u.email}`);
      console.log(`IsAdmin:  ${u.isAdmin}`);
      console.log(`Created:  ${u.createdAt}`);
      console.log(`-----------------------------------`);
    });

    if (users.length === 0) {
      console.log("⚠️ No users found! Registration might be failing to save.");
    } else {
      console.log("\n✅ Users are being saved correctly.");
    }

    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error verifying users:", error);
    process.exit(1);
  }
};

verifyUsers();
