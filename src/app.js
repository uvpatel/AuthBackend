import express from "express";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",  // allow your React app
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// routes import
import userRouter from "./routes/user.routes.js"

// routes declaration
app.use("/api/users", userRouter)





export { app };
