"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Pokemon } from "@/lib/types/pokemon"
import { getPokemonDetails } from "@/api/pokemonService"
import PokemonDetailsComponent from "../../../components/PokemonDetails"
import HomePageButton from "@/components/HomePageButton"

const PokemonDetails = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true) // start loading
  const { name } = useParams()

  useEffect(() => {
    if (!name) return

    const fetchPokemonDetails = async () => {
      setLoading(true)
      setErrorMessage(null)

      try {
        const response = await getPokemonDetails(
          Array.isArray(name) ? name[0] : name
        )

        if (!response) {
          setPokemon(null)
          setErrorMessage("Pokemon Not Found")
        } else {
          setPokemon(response)
        }
      } catch (error: any) {
        const backendMsg = error?.response?.data?.error || "Erro desconhecido"
        setErrorMessage(backendMsg)
        setPokemon(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemonDetails()
  }, [name])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-lg text-gray-600">Searching Pokemon...</p>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="flex flex-col items-center justify-center mt-10 gap-6">
        <div className="text-center text-red-500">{errorMessage}</div>
        <HomePageButton />
      </div>
    )
  }

  // Aqui, se chegou, já tem pokemon válido
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">{pokemon?.name}</h1>
      <div className="flex flex-col items-center">
        <PokemonDetailsComponent pokemon={pokemon!} />
      </div>
      <div className="flex justify-center mt-6">
        <HomePageButton />
      </div>
    </div>
  )
}

export default PokemonDetails
