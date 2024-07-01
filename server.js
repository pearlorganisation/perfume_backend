import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

//MIDDLEWARES
dotenv.config();
const app = express();
const PORT = 8000 || process.env.PORT;

//CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5174",
      "https://perfumetrics.com",
      "https://admin.perfumetrics.com",
    ],
    credentials: true,
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    exposedHeaders: ["*", "Authorization"],
  })
);


import authRoutes from "./src/routes/auth.js";
import perfumeRoutes from "./src/routes/perfume.js";
import noteRoutes from "./src/routes/note.js";

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/perfume", perfumeRoutes);
app.use("/api/v1/note", noteRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Listening to port ${PORT}`);
});
