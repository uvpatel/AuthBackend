import dotenv from "dotenv";
import connectDB from "./db/connect.db.js";
import { app } from "./app.js";
import cors from "cors";
dotenv.config({
  path: './.env'
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
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
