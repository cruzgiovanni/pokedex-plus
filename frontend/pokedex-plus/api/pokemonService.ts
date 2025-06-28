import { Pokemon } from "@/lib/types/pokemon"
import axios from "axios"

const BASE_URL = "http://localhost:5000/api/pokemon"

export const getAllPokemons = async (): Promise<Pokemon[]> => {
  const response = await axios.get<{ data: Pokemon[] }>(BASE_URL)
  return response.data.data
}

export const getPokemonDetails = async (name: string): Promise<Pokemon> => {
  const response = await axios.get<Pokemon>(`${BASE_URL}/${name}`)
  if (response.status !== 200) {
    throw new Error("Failed to fetch pokemon details")
  }
  const data = response.data

  const pokemon: Pokemon = {
    name: data.name,
    id: data.id,
    type: data.type,
    height: data.height,
    weight: data.weight,
    image: data.image,
    abilities: [],
  }

  return pokemon
}
