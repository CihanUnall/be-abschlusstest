import Job from "../models/jobs.js";

// 1. loadAll – Show all Jobs
export const loadAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/// 2. loadFiltered – Show ads that have "react" in their title
export const loadFilteredJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ title: /React/i });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. apply – User applies to an job posting
export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { userId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });

    // eğer başvuranlar listesi varsa
    if (!job.applicants) job.applicants = [];

    if (!job.applicants.includes(userId)) {
      job.applicants.push(userId);
      await job.save();
    }

    res.status(200).json({ message: "Application successful", job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
