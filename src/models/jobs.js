import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  description: String,
  location: String,
  salary: {
    type: String,
    default: "Negotiable",
  },
  technologies: {
    type: [String],
    default: [],
  },
  employmentType: {
    type: String,
    default: "Full-time",
  },
  applicants: {
    type: [String],
    default: [],
  },
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
