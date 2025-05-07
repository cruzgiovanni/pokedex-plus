"use client"

import { useEffect, useState } from "react"
import { Pokemon } from "@/lib/types/pokemon"
import { getAllPokemons } from "@/api/pokemonService"
import PokemonCard from "@/components/PokemonCard"

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await getAllPokemons()
        setPokemons(data)
      } catch (error) {
        console.error("Error fetching pokemons", error)
      }
    }

    fetchPokemons()
  }, [])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-white font-bold text-center mb-6">
        PokeDex+
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  )
}

export default Home
