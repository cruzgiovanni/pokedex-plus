import { Schema, model } from "mongoose"

interface IPokemon {
  name: string
  id: number
  type: string[]
  height: number
  weight: number
  baseExperience: number,
  image: string
}

const pokemonSchema = new Schema<IPokemon>({
  name: { type: String, required: true, unique: true },
  id: { type: Number, required: true, unique: true },
  type: { type: [String], required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  baseExperience: { type: Number, required: true },
  image: { type: String, required: true },
})

const Pokemon = model<IPokemon>("Pokemon", pokemonSchema)

export default Pokemon
