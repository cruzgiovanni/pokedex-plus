import Link from "next/link"
import Image from "next/image"
import { Pokemon } from "@/lib/types/pokemon"

interface Props {
  pokemon: Pokemon
}

const getTypeColor = (type: string): string => {
  const typeColors: { [key: string]: string } = {
    fire: "from-red-400 to-orange-500",
    water: "from-blue-400 to-cyan-500",
    grass: "from-green-400 to-emerald-500",
    electric: "from-yellow-400 to-amber-500",
    psychic: "from-pink-400 to-purple-500",
    ice: "from-cyan-300 to-blue-400",
    dragon: "from-purple-500 to-indigo-600",
    dark: "from-gray-700 to-gray-900",
    fairy: "from-pink-300 to-rose-400",
    fighting: "from-red-600 to-orange-600",
    poison: "from-purple-500 to-violet-600",
    ground: "from-yellow-600 to-orange-600",
    flying: "from-blue-300 to-indigo-400",
    bug: "from-green-500 to-lime-600",
    rock: "from-yellow-700 to-gray-600",
    ghost: "from-purple-600 to-indigo-700",
    steel: "from-gray-400 to-slate-500",
    normal: "from-gray-300 to-gray-400",
  }
  return typeColors[type.toLowerCase()] || "from-gray-300 to-gray-400"
}

const PokemonCard = ({ pokemon }: Props) => {
  const primaryType = pokemon.type[0]
  const gradientColor = getTypeColor(primaryType)

  return (
    <Link href={`/pokemon/${pokemon.name}`} className="group block">
      <div
        className={`relative bg-gradient-to-br ${gradientColor} rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/20"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/15"></div>
        </div>

        {/* Pokemon ID */}
        <div className="absolute top-4 left-4 text-white/70 font-bold text-sm">
          #{pokemon.id.toString().padStart(3, "0")}
        </div>

        {/* Pokemon Image */}
        <div className="relative z-10 mb-4">
          <div className="bg-white/20 rounded-full p-2 mx-auto w-fit backdrop-blur-sm">
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={120}
              height={120}
              className="w-24 h-24 mx-auto drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              priority
            />
          </div>
        </div>

        {/* Pokemon Name */}
        <h2 className="text-xl font-bold text-white text-center mb-3 capitalize drop-shadow-md">
          {pokemon.name}
        </h2>

        {/* Pokemon Types */}
        <div className="flex justify-center gap-2 mb-4">
          {pokemon.type.map((type) => (
            <span
              key={type}
              className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-white text-xs font-semibold uppercase tracking-wide border border-white/20"
            >
              {type}
            </span>
          ))}
        </div>

        {/* View Details Button */}
        <div className="text-center">
          <span className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 border border-white/30 group-hover:border-white/50">
            View Details →
          </span>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/10 to-transparent"></div>
      </div>
    </Link>
  )
}

export default PokemonCard
