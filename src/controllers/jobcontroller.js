import Job from "../models/jobs.js";

// GET all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST create new job
export const createJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Ad could not be saved", details: err.message });
  }
};

// `req` = eingehende HTTP-Anfrage.
// `res` = Objekt, dessen Antwort wir zurückgeben.
// `req` = gelen HTTP isteği
// `res` = yanıtı döndüğümüz nesne

// PUT update job
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedJob) return res.status(404).json({ error: "Job not found" });
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE job
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Job.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Job not found" });
    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
