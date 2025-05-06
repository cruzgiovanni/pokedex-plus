import app from "./app"
import dotenv from "dotenv"
import { connectDb } from "./config/db"

dotenv.config()

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDb()
    app.listen(PORT, () => {
      console.log(`🚀 Server running at ${PORT}`)
    })
  } catch (err) {
    console.error("❌ Failed to start server:", err)
    process.exit(1)
  }
}

startServer()
