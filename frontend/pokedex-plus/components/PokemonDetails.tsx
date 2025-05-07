import { Pokemon } from "@/lib/types/pokemon"
import Image from "next/image"

interface Props {
  pokemon: Pokemon
}

const PokemonDetailsComponent = ({ pokemon }: Props) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center">
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        width={300}
        height={300}
        className="w-32 h-32 mx-auto mb-4"
        priority
      />
      <h2 className="text-xl font-semibold text-black">
        {pokemon.name.toUpperCase()}
      </h2>
      <p className="text-sm text-gray-600">{pokemon.type.join(", ")}</p>
      <p className="text-sm text-gray-600">
        Height: {pokemon.height} decimetres
      </p>
      <p className="text-sm text-gray-600">
        Weight: {pokemon.weight} hectograms
      </p>
      <p className="text-sm text-gray-600">
        Base Experience: {pokemon.baseExperience}
      </p>
    </div>
  )
}

export default PokemonDetailsComponent
