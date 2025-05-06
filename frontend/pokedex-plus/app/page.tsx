"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import Image from "next/image"

interface Pokemon {
  name: string
  id: number
  type: string[]
  image: string
}

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get<{ data: Pokemon[] }>(
          "http://localhost:5000/api/pokemon"
        )
        // Acesse o array dentro de response.data
        setPokemons(response.data.data)
      } catch (error) {
        console.error("Error fetching pokemons", error)
      }
    }

    fetchPokemons()
  }, [])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">PokeDex+</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-white shadow-md rounded-lg p-4 text-center"
          >
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={128}
              height={128}
              className="w-32 h-32 mx-auto mb-4"
              priority
            />
            <h2 className="text-xl font-semibold text-black">
              {pokemon.name.toUpperCase()}
            </h2>
            <p className="text-sm text-gray-600">{pokemon.type.join(", ")}</p>
            <Link href={`/pokemon/${pokemon.name}`} className="text-blue-500">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
