import { Pokemon } from "@/lib/types/pokemon"
import axios from "axios"

const BASE_URL = "http://localhost:5000/api/pokemon"

export const getAllPokemons = async (params?: {
  page?: number
  limit?: number
  type?: string
}): Promise<{
  data: Pokemon[]
  page: number
  limit: number
  total: number
  totalPages: number
}> => {
  const queryParams = new URLSearchParams()
  if (params?.page) queryParams.append("page", params.page.toString())
  if (params?.limit) queryParams.append("limit", params.limit.toString())
  if (params?.type) queryParams.append("type", params.type)

  const url = queryParams.toString() ? `${BASE_URL}?${queryParams}` : BASE_URL
  const response = await axios.get<{
    data: Pokemon[]
    page: number
    limit: number
    total: number
    totalPages: number
  }>(url)
  return response.data
}

export const getPokemonDetails = async (name: string): Promise<Pokemon> => {
  const response = await axios.get<Pokemon>(`${BASE_URL}/${name}`)
  if (response.status !== 200) {
    throw new Error("Failed to fetch pokemon details")
  }
  const data = response.data

  const pokemon: Pokemon = {
    name: data.name,
    id: data.id,
    type: data.type,
    height: data.height,
    weight: data.weight,
    image: data.image,
    abilities: [],
    notFound: false,
  }

  return pokemon
}
