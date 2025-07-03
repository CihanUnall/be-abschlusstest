import mongoose from "mongoose";

export const connectToDB = async () => {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not set.");
  }

  mongoose.connection.on("error", (error) => {
    console.error("❌ Failed to connect to MongoDB:", error);
  });

  mongoose.connection.on("connected", () => {
    console.log("✅ Connected to MongoDB");
  });

  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
