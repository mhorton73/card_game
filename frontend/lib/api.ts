
import { 
  CardListResponse, 
  DeckCollectionResponse,
  DeckCard
} from "./types"

const API_BASE = "http://localhost:8000"

export async function getCards(setId?: number): Promise<CardListResponse> {
  
  const url = new URL(`${API_BASE}/cards`)
  if (setId !== undefined) {
    url.searchParams.append("set_id", setId.toString())
  }
  
  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error("Failed to fetch cards")
  }

  return response.json()
}

export async function getDecks(): Promise<DeckCollectionResponse>  {
  const res = await fetch(`${API_BASE}/decks`)
  if (!res.ok) throw new Error("Failed to fetch decks")

  return res.json()
}

export async function deleteDeck(deckId: number): Promise<void>  {
  const res = await fetch(`${API_BASE}/decks/${deckId}`, 
    {
      method: "DELETE"
    }
  )
  if (!res.ok) throw new Error("Failed to delete deck")
}

export async function addDeckCardCopy(deckId: number, cardId: number): Promise<DeckCard> {
  const res = await fetch(`${API_BASE}/decks/${deckId}/cards/${cardId}`, 
    {
      method: "POST"
    }
  )
  if (!res.ok) throw new Error("Failed to add card to deck")
  return res.json()
}

export async function removeDeckCardCopy(deckId: number, cardId: number): Promise<DeckCard> {
  const res = await fetch(`${API_BASE}/decks/${deckId}/cards/${cardId}`, 
    {
      method: "DELETE"
    }
  )
  if (!res.ok) throw new Error("Failed to remove card from")
  return res.json()
}