import axios from "axios"

const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon"

export const getPokemonData = async (pokemonName: string) => {
  try {
    const response = await axios.get(`${POKE_API_URL}/${pokemonName}`)
    const data = response.data

    return {
      name: data.name,
      id: data.id,
      type: data.types.map(
        (type: { type: { name: string } }) => type.type.name
      ),
      height: data.height,
      weight: data.weight,
      baseExperience: data.base_experience,
      image: data.sprites.front_default,
    }
  } catch (error) {
    console.error("Error fetching Pokémon data:", error)
    throw error
  }
}
