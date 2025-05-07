"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Pokemon } from "@/lib/types/pokemon"
import { getPokemonDetails } from "@/api/pokemonService"
import PokemonDetailsComponent from "../../../components/PokemonDetails"

const PokemonDetails = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const { name } = useParams()

  useEffect(() => {
    if (!name) return

    const fetchPokemonDetails = async () => {
      try {
        const response = await getPokemonDetails(
          Array.isArray(name) ? name[0] : name
        )
        setPokemon(response)
      } catch (error) {
        console.error("Error fetching pokemon details", error)
      }
    }

    fetchPokemonDetails()
  }, [name])

  if (!pokemon) return <div>Loading...</div>

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">{pokemon.name}</h1>
      <div className="flex flex-col items-center">
        <PokemonDetailsComponent pokemon={pokemon} />
      </div>
    </div>
  )
}

export default PokemonDetails
