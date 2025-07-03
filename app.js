import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectToDB } from "./src/libs/db.js";
import jobRoutes from "./src/routes/jobRoutes.js";
import userJobRoutes from "./src/routes/userJobsRoutes.js";
import cors from "cors";

await connectToDB();

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use("/api/jobspostings", jobRoutes);
app.use("/api/userjobs", userJobRoutes);

app.get("/", (req, res) => res.send("Hallo, this is the Job API!"));

app.listen(PORT, () => {
  console.log(`🌟 Server is running on: http://localhost:${PORT}`);
});
