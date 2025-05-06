import { Router } from "express"
import { deletePokemon, getAllPokemons, getPokemon } from "../controllers/pokemonController"

const router = Router()

router.get("/pokemon/:name", getPokemon)
router.get("/pokemon", getAllPokemons)
router.delete("/:name", deletePokemon)

export default router
