import { Request, Response } from "express"
import Pokemon from "../models/Pokemon"
import { getPokemonData } from "../services/pokeApiService"

export const getPokemon = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.params

  try {
    let pokemon = await Pokemon.findOne({ name }).lean()

    if (!pokemon) {
      const data = await getPokemonData(name)
      const newPokemon = new Pokemon(data)
      await newPokemon.save()
      pokemon = newPokemon.toObject()
    }

    const { _id, __v, ...cleanedPokemon } = pokemon
    res.json(cleanedPokemon)
  } catch (error) {
    console.error("Error fetching Pokémon data:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getAllPokemons = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const typeQuery = req.query.type as string
    let filter = {}

    if (typeQuery) {
      const types = typeQuery.split(",").map((t) => t.trim())
      // Usa $in para buscar qualquer Pokémon que tenha um dos tipos informados
      filter = { type: { $in: types } }
    }

    const total = await Pokemon.countDocuments(filter)
    const pokemons = await Pokemon.find(filter).skip(skip).limit(limit).lean()

    const cleanedPokemons = pokemons.map(({ _id, __v, ...rest }) => rest)

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: cleanedPokemons,
    })
  } catch (error) {
    console.error("Error fetching all Pokémon data:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const deletePokemon = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.params

  try {
    const result = await Pokemon.findOneAndDelete({ name })
    if (!result) {
      res.status(404).json({ message: "Pokemon not found" })
    }
    res.status(200).json({ message: "Pokemon deleted successfully" })
  } catch (error) {
    console.error("Error deleting Pokémon:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}
