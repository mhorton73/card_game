
import { 
  SetListResponse,
  CardIn, Card,
  CardListResponse, 
  DeckIn, Deck,
  DeckCollectionResponse,
  DeckCard,
  DeckDetail,
} from "./types"

const API_BASE = "http://localhost:8000"

// Card Editor API calls

export async function getSets(): Promise<SetListResponse> {
  const res = await fetch("http://localhost:8000/sets")
  if (!res.ok) throw new Error("Failed to fetch sets")
  return res.json()
}

export async function getCards(setId?: number): Promise<CardListResponse> {
  
  const url = new URL(`${API_BASE}/cards`)
  if (setId !== undefined) {
    url.searchParams.append("set_id", setId.toString())
  }
  
  const res = await fetch(url.toString())

  if (!res.ok) {
    throw new Error("Failed to fetch cards")
  }

  return res.json()
}

export async function getCard(cardId: number): Promise<Card> {
  const res = await fetch(`http://localhost:8000/cards/${cardId}`)
  return res.json()
}

export async function createCard(payload: CardIn): Promise<Card> {
  const res = await fetch(`${API_BASE}/cards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error("Failed to create card")
  }

  return res.json()
}

export async function updateCard(id: number, payload: CardIn): Promise<Card> {
  const res = await fetch(`${API_BASE}/cards/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error("Failed to update card")

  return res.json()
}

// Deck Builder API calls

export async function getDecks(): Promise<DeckCollectionResponse>  {
  const res = await fetch(`${API_BASE}/decks`)
  if (!res.ok) throw new Error("Failed to fetch decks")

  return res.json()
}

export async function addDeck(payload: DeckIn): Promise<Deck> {
  const res = await fetch(`${API_BASE}/decks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error("Failed to create deck")
  }

  return res.json()
}

export async function editDeck(deckId: number, payload: DeckIn): Promise<Deck> {
    const res = await fetch(`${API_BASE}/decks/${deckId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error("Failed to update deck")
  }

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
  const res = await fetch(`${API_BASE}/decks/${deckId}/cards/${cardId}`,{
      method: "DELETE"
    }
  )
  if (!res.ok) throw new Error("Failed to remove card from")
  return res.json()
}

export async function getDeck(deckId:number): Promise<DeckDetail> {
  const res = await fetch(`http://localhost:8000/decks/${deckId}`)
  return res.json()
}

export async function cloneDeck(deckId: number): Promise<Deck> {
  const res = await fetch(`${API_BASE}/decks/${deckId}/clone`, {
    method: "POST"
  })

  if (!res.ok) {
    throw new Error("Failed to clone deck")
  }

  return res.json()
}