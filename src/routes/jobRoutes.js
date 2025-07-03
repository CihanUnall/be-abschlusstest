import express from "express";
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobcontroller.js";

const router = express.Router();

// Routes
router.get("/", getJobs);
router.post("/", createJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
