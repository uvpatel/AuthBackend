import express from "express";
import cors from "cors";


const app = express();
app.use(express.json());


const allowedOrigins = [
  "http://localhost:5173",     // local React
  "https://auth-frontend-dtsr.vercel.app/",
  "https://auth-frontend-4y99.vercel.app/"
];

app.use(cors({
  origin: allowedOrigins,  // allow your React app
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// routes import
import userRouter from "./routes/user.routes.js"

// routes declaration
app.use("/api/users", userRouter)





export { app };
