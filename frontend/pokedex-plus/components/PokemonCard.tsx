import Link from "next/link"
import Image from "next/image"
import { Pokemon } from "@/lib/types/pokemon"

interface Props {
  pokemon: Pokemon
}

const PokemonCard = ({ pokemon }: Props) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center">
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
  )
}

export default PokemonCard
