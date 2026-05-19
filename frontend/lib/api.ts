
import { CardListResponse } from "./types"

const API_BASE = "http://localhost:8000"

export async function getCards(): Promise<CardListResponse> {
  const response = await fetch(`${API_BASE}/card-editor/cards`)

  if (!response.ok) {
    throw new Error("Failed to fetch cards")
  }

  return response.json()
}