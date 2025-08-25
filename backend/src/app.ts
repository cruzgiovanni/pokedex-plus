import express from "express"
import cors from "cors"
import pokemonRoutes from "./routes/pokemonRoutes"

const app = express()

app.use(cors())

app.use(express.json())
app.use("/api", pokemonRoutes)

app.get("/", (_req, res) => {
  res.send("PokeDex+ API is running!")
})

export default app
