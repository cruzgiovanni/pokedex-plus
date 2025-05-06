import express from "express"
import cors from "cors"  // Importando o pacote CORS
import pokemonRoutes from "./routes/pokemonRoutes"

const app = express()

// Configurando o CORS
app.use(cors())  // Permite todas as origens. Pode ser personalizado conforme necessário

app.use(express.json())
app.use("/api", pokemonRoutes)

app.get("/", (_req, res) => {
  res.send("PokeDex+ API is running!")
})

export default app
