import mongoose from "mongoose";

export const connectToDB = async () => {
  const { MONGODB_URI } = process.env || 5500;
  try {
    mongoose.connection.on("error", (error) => {
      console.error("Failed to connect to MongoDB:", error);
    });

    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};
