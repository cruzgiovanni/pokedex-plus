import { Pokemon } from "@/lib/types/pokemon"
import Image from "next/image"

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

const PokemonDetailsComponent = ({ pokemon }: Props) => {
  const primaryType = pokemon.type[0]
  const gradientColor = getTypeColor(primaryType)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header com imagem e informações principais */}
      <div
        className={`relative bg-gradient-to-br ${gradientColor} rounded-3xl p-8 shadow-2xl mb-8 overflow-hidden`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-white/20"></div>
          <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full bg-white/15"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-white/5 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          {/* Imagem do Pokémon */}
          <div className="text-center">
            <div className="bg-white/20 rounded-full p-6 mx-auto w-fit backdrop-blur-sm shadow-2xl">
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                width={300}
                height={300}
                className="w-64 h-64 mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            {/* ID do Pokémon */}
            <div className="mt-4 text-white/80 font-bold text-lg">
              #{pokemon.id.toString().padStart(3, "0")}
            </div>
          </div>

          {/* Informações principais */}
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-6 capitalize drop-shadow-lg">
              {pokemon.name}
            </h1>

            {/* Types */}
            <div className="flex gap-3 mb-6">
              {pokemon.type.map((type) => (
                <span
                  key={type}
                  className="px-6 py-3 bg-white/30 backdrop-blur-sm rounded-full text-white text-lg font-bold uppercase tracking-wide border border-white/30 shadow-lg"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats detalhadas */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Physical Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full mr-3 flex items-center justify-center">
              📏
            </div>
            Physical Stats
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-semibold text-gray-700">Height</span>
              <span className="text-xl font-bold text-blue-600">
                {(pokemon.height / 10).toFixed(1)}m
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-semibold text-gray-700">Weight</span>
              <span className="text-xl font-bold text-green-600">
                {(pokemon.weight / 10).toFixed(1)}kg
              </span>
            </div>
          </div>
        </div>

        {/* Type Effectiveness */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-8 h-8 bg-purple-500 rounded-full mr-3 flex items-center justify-center">
              ⚡
            </div>
            Type Details
          </h3>

          <div className="space-y-3">
            <div>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Primary Type
              </span>
              <div
                className={`mt-1 p-3 bg-gradient-to-r ${getTypeColor(
                  pokemon.type[0]
                )} rounded-lg text-white font-bold text-center capitalize shadow-md`}
              >
                {pokemon.type[0]}
              </div>
            </div>

            {pokemon.type[1] && (
              <div>
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Secondary Type
                </span>
                <div
                  className={`mt-1 p-3 bg-gradient-to-r ${getTypeColor(
                    pokemon.type[1]
                  )} rounded-lg text-white font-bold text-center capitalize shadow-md`}
                >
                  {pokemon.type[1]}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 md:col-span-2 lg:col-span-1">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-8 h-8 bg-orange-500 rounded-full mr-3 flex items-center justify-center">
              📊
            </div>
            Quick Facts
          </h3>

          <div className="space-y-4">
            <div className="text-center p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {pokemon.type.length}
              </div>
              <div className="text-sm font-semibold text-gray-600">
                Type{pokemon.type.length > 1 ? "s" : ""}
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                #{pokemon.id}
              </div>
              <div className="text-sm font-semibold text-gray-600">
                Pokédex Number
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetailsComponent
