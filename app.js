// Viel Spaß!
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import { connectToDB } from "./src/libs/db.js";

//Meli
import authRoutes from "./src/routes/authRoutes.js";

await connectToDB();

const app = express();
const PORT = process.env.PORT || 5500;

//Middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

// Routes
app.get("/", (req, res) => res.send("🚀 JobBoard API is running!"));

app.listen(PORT, () => {
  console.log(`🌟 Server is running on: http://localhost:${PORT}`);
});
