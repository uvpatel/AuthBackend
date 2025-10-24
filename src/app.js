import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://auth-frontend-4y99.vercel.app"
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // Postman, etc.
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error("CORS Not Allowed"), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

// API routes
app.use("/api/users", userRouter);

export { app };
