import express from "express";
import {
  loadAllJobs,
  loadFilteredJobs,
  applyToJob,
} from "../controllers/userJobsController.js";

const router = express.Router();

router.get("/", loadAllJobs);
router.get("/filter", loadFilteredJobs);
router.post("/apply/:jobId", applyToJob);

export default router;
