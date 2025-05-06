import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!)
    console.log("✅ MongoDB connected")
  } catch (error) {
    console.error("Connection error with MongoDB:", error)
    process.exit(1)
  }
}
