"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation" // Use o hook correto para acessar os parâmetros
import axios from "axios"

interface Pokemon {
  name: string
  id: number
  type: string[]
  height: number
  weight: number
  baseExperience: number
  image: string
}

const PokemonDetails = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const { name } = useParams() // Substitui o uso de useRouter

  useEffect(() => {
    if (!name) return

    const fetchPokemonDetails = async () => {
      try {
        // Verifique a resposta antes de continuar
        const response = await axios.get<Pokemon>(
          `http://localhost:5000/api/pokemon/${name}`
        )
        console.log("Pokemon details:", response.data) // Verifique o que está sendo retornado da API
        setPokemon(response.data)
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
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-48 h-48 mb-4"
        />
        <p>
          <strong>Type:</strong> {pokemon.type.join(", ")}
        </p>
        <p>
          <strong>Height:</strong> {pokemon.height} decimetres
        </p>
        <p>
          <strong>Weight:</strong> {pokemon.weight} hectograms
        </p>
        <p>
          <strong>Base Experience:</strong> {pokemon.baseExperience}
        </p>
      </div>
    </div>
  )
}

export default PokemonDetails
