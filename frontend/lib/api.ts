
import { CardListResponse } from "./types"

const API_BASE = "http://localhost:8000"

export async function getCards(setId?: number): Promise<CardListResponse> {
  
  const url = new URL(`${API_BASE}/cards`)
  if (setId !== undefined) {
    url.searchParams.append("set_id", setId.toString())
  }
  console.log(url.toString())
  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error("Failed to fetch cards")
  }

  return response.json()
}