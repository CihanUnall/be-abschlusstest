// Viel Spaß!
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import { connectToDB } from "./src/libs/db.js";

await connectToDB();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => res.send("🚀 JobBoard API is running!"));

app.listen(PORT, () => {
  console.log(`🌟 Server is running on: http://localhost:${PORT}`);
});
