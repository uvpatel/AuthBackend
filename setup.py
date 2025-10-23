import os

# Define base path (current directory)
base_dir = os.path.join(os.getcwd(), "src")

# Folder structure
folders = [
    os.path.join(base_dir, "db"),
    os.path.join(base_dir, "models"),
    os.path.join(base_dir, "routes")
]

# Files with their content
files = {
    # constants.js
    os.path.join(base_dir, "constants.js"): '''export const DB_NAME = "mydatabase";''',

    # db/connect.db.js
    os.path.join(base_dir, "db", "connect.db.js"): '''import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`✅ MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection FAILED:", error.message);
    process.exit(1);
  }
};

export default connectDB;
''',

    # models/user.model.js
    os.path.join(base_dir, "models", "user.model.js"): '''import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
''',

    # routes/user.routes.js
    os.path.join(base_dir, "routes", "user.routes.js"): '''import express from "express";
import { User } from "../models/user.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
''',

    # app.js
    os.path.join(base_dir, "app.js"): '''import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

export { app };
''',

    # index.js
    os.path.join(os.getcwd(), "index.js"): '''import dotenv from "dotenv";
import connectDB from "./src/db/connect.db.js";
import { app } from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
'''
}

# Create folders
for folder in folders:
    os.makedirs(folder, exist_ok=True)

# Create files with content
for path, content in files.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

print("✅ Backend project structure created successfully!")
