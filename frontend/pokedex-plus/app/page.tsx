"use client"

import { useEffect, useState, useCallback } from "react"
import { Pokemon } from "@/lib/types/pokemon"
import { getAllPokemons } from "@/api/pokemonService"
import PokemonCard from "@/components/PokemonCard"

// Skeleton Loading Component
const PokemonSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
    <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
    <div className="flex gap-2">
      <div className="h-6 bg-gray-300 rounded-full w-16"></div>
      <div className="h-6 bg-gray-300 rounded-full w-16"></div>
    </div>
  </div>
)

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([])

  const fetchPokemons = useCallback(
    async (currentPage: number, isNewSearch = false) => {
      if (loading) return

      setLoading(true)
      setError(null)

      try {
        const response = await getAllPokemons({ page: currentPage, limit: 20 })

        if (isNewSearch) {
          setPokemons(response.data || [])
        } else {
          setPokemons((prev) => [...prev, ...(response.data || [])])
        }

        setHasMore(currentPage < (response.totalPages || 1))
      } catch (error) {
        console.error("Error fetching pokemons", error)
        setError("Error fetching pokemons. Please try again.")
      } finally {
        setLoading(false)
      }
    },
    [loading]
  )

  // Scroll infinito
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1000 >=
        document.documentElement.scrollHeight &&
      hasMore &&
      !loading &&
      !searchTerm
    ) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchPokemons(nextPage)
    }
  }, [hasMore, loading, page, fetchPokemons, searchTerm])

  // Busca local
  useEffect(() => {
    if (!searchTerm) {
      setFilteredPokemons(pokemons)
    } else {
      const filtered = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredPokemons(filtered)
    }
  }, [searchTerm, pokemons])

  useEffect(() => {
    fetchPokemons(1, true)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const loadMore = () => {
    if (hasMore && !loading && !searchTerm) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchPokemons(nextPage)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-white font-bold text-center mb-6">
        PokeDex+
      </h1>

      {/* Barra de Busca */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md mx-auto block px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
        />
      </div>

      {error && (
        <div className="text-center text-red-500 mb-6 p-4 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}

        {/* Skeleton Loading */}
        {loading &&
          Array.from({ length: 8 }).map((_, index) => (
            <PokemonSkeleton key={`skeleton-${index}`} />
          ))}
      </div>

      {!loading && filteredPokemons.length === 0 && !error && (
        <div className="text-center text-gray-500 mt-12">
          <p className="text-xl mb-2">No Pokemon found</p>
          {searchTerm && <p>Try searching for another name</p>}
        </div>
      )}

      {!searchTerm && hasMore && !loading && filteredPokemons.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Show More Pokemons
          </button>
        </div>
      )}

      {!hasMore && !searchTerm && filteredPokemons.length > 0 && (
        <div className="text-center mt-8 text-gray-500">
          All Pokemons loaded!
        </div>
      )}
    </div>
  )
}

export default Home
