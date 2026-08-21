
import { 
  SetIn, CardSet,
  SetListResponse,
  CardIn, Card,
  CardListResponse, 
  DeckIn, Deck,
  DeckCollectionResponse,
  DeckCard,
  DeckDetail,
  GameLobbyListing,
  CreateGameResponse,
  MoveCardRequest,
  DrawCardsRequest,
  BasicCardActionRequest,
  DrawFromBottomRequest,
  PeekTopNRequest,
  AddToStackRequest,
  RemoveFromStackRequest,
  CardCountersRequest,
  PlayerActionRequest,
  ChangeLifeRequest,
  SetLifeRequest,
  ChangeManaRequest,
  CardInstanceOut,
  JoinGameRequest,
  SelectDeckRequest,
  CreateGameRequest,
} from "./types"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function callGameAction(url:string, body: unknown): Promise<void> {
  
  console.log("GAME ACTION URL:", url)
  console.log("GAME ACTION BODY:", body)
  console.log("GAME ACTION BODY JSON:", JSON.stringify(body))

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    console.error("GAME ACTION FAILED")
    console.error("Status:", res.status)
    console.error("Status text:", res.statusText)

    const errorBody = await res.text()
    console.error("Response body:", errorBody)
    throw new Error("Request failed")
  }
}

// Card Editor API calls

export async function getSets(): Promise<SetListResponse> {
  const res = await fetch(`${API_BASE}/sets`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to fetch sets")
  return res.json()
}

export async function getSet(id:number): Promise<CardSet> {
  const res = await fetch(`${API_BASE}/sets/${id}`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to fetch sets")
  return res.json()
}

export async function addSet(set: SetIn): Promise<CardSet> {
  const res = await fetch(`${API_BASE}/sets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(set),
  })
  
  if (!res.ok) {
    throw new Error("Failed to create set")
  }

  return res.json()
}

export async function getCards(setId?: number): Promise<CardListResponse> {
  
  const url = new URL(`${API_BASE}/cards`)
  if (setId !== undefined) {
    url.searchParams.append("set_id", setId.toString())
  }

  console.log("API_BASE:", API_BASE)
  console.log("GETTING CARDS FROM:", url.toString())

  const res = await fetch(url.toString(), {
    cache: "no-store",
  })

  console.log("GET /cards STATUS:", res.status)

  if (!res.ok) {
    throw new Error("Failed to fetch cards")
  }

  return res.json()
}

export async function getCard(cardId: number): Promise<Card> {
  const res = await fetch(`${API_BASE}/cards/${cardId}`, {
    cache: "no-store",
  })
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
  const res = await fetch(`${API_BASE}/decks`, {
    cache: "no-store",
  })
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
  const res = await fetch(`${API_BASE}/decks/${deckId}`, {
    cache: "no-store",
  })
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

// Game Lobby API calls

export async function listGames(): Promise<GameLobbyListing[]>  {
  const res = await fetch(`${API_BASE}/games`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to fetch games")

  return res.json()
}

export async function createGame(req: CreateGameRequest): Promise<string> {
  const res = await fetch(`${API_BASE}/games/create`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(req)
  })

  if (!res.ok) {
    throw new Error("Failed to create game")
  }

  const data: CreateGameResponse = await res.json()

  return data.game_id
}

export async function joinGame(gameId: string, req: JoinGameRequest): Promise<void> {
  const res = await fetch(`${API_BASE}/games/${gameId}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  })

  if (!res.ok) {
    throw new Error("Failed to join game")
  }
}


export async function selectDeck(gameId: string, req: SelectDeckRequest): Promise<void> {
  const res = await fetch(`${API_BASE}/games/${gameId}/select-deck`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  })

  if (!res.ok) {
    throw new Error("Failed to select deck")
  }
}


export async function startGame(gameId: string): Promise<void> {
  const res = await fetch(`${API_BASE}/games/${gameId}/start-game`, {
    method: "POST"
  })

  if (!res.ok) {
    throw new Error("Failed to start")
  }
}

// Game Route API calls

export function moveCard(gameId: string, req: MoveCardRequest): Promise<void> {
  return callGameAction(`${API_BASE}/games/${gameId}/actions/move-card`, req)
}

export function drawCards(gameId: string, req: DrawCardsRequest): Promise<void> {
  return callGameAction(`${API_BASE}/games/${gameId}/actions/draw-cards`, req)
}

export function putOnTop(gameId: string, req: BasicCardActionRequest): Promise<void> {
  return callGameAction(`${API_BASE}/games/${gameId}/actions/put-on-top`, req)
}

export function putOnBottom(gameId: string, req: BasicCardActionRequest): Promise<void> {
  return callGameAction(`${API_BASE}/games/${gameId}/actions/put-on-bottom`, req)
}

export function drawFromBottom(gameId: string, req: DrawFromBottomRequest): Promise<void> {
  return callGameAction(`${API_BASE}/games/${gameId}/actions/draw-from-bottom`, req)
}

export async function peekTopN(gameId: string, req: PeekTopNRequest): Promise<CardInstanceOut[]> {
  const res = await fetch(`${API_BASE}/games/${gameId}/actions/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })

  if (!res.ok) {
    throw new Error("Request failed")
  }
  return res.json()
}

export async function coinFlip(gameId: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/games/${gameId}/actions/coin-flip`, {
    method: "POST"
  })

  if (!res.ok) {
    throw new Error("Request failed")
  }
  return res.json()
}

export function addToStack(gameId: string, req: AddToStackRequest): Promise<void> {
  return callGameAction(`${API_BASE}/games/${gameId}/actions/add-to-stack`, req)
}

export function removeFromStack(gameId: string, req: RemoveFromStackRequest): Promise<void> {
  return callGameAction(`${API_BASE}/games/${gameId}/actions/remove-from-stack`, req)
}

export function tapCard(gameId: string, req: BasicCardActionRequest): Promise<void> {
  return callGameAction(`${API_BASE}/games/${gameId}/actions/tap-card`, req)
}

export function untapCard(gameId: string, req: BasicCardActionRequest): Promise<void> {
  return callGameAction(`${API_BASE}/games/${gameId}/actions/untap-card`, req)
}

export function addCounter(gameId: string, req: CardCountersRequest): Promise<void> {
  return callGameAction(`${API_BASE}/games/${gameId}/actions/add-counter`, req)
}

export function removeCounter(gameId: string, req: CardCountersRequest): Promise<void> {
  return callGameAction(`${API_BASE}/games/${gameId}/actions/remove-counter`, req)
}

export function changeLife(gameId: string, req: ChangeLifeRequest): Promise<void> {
  return callGameAction(`${API_BASE}/games/${gameId}/actions/change-life`, req)
}

export function setLife(gameId: string, req: SetLifeRequest): Promise<void> {
  return callGameAction(`${API_BASE}/games/${gameId}/actions/set-life`, req)
}

export function changeMana(gameId: string, req: ChangeManaRequest): Promise<void> {
  return callGameAction(`${API_BASE}/games/${gameId}/actions/change-mana`, req)
}

export function clearMana(gameId: string, req: PlayerActionRequest): Promise<void> {
  return callGameAction(`${API_BASE}/games/${gameId}/actions/clear-mana`, req)
}

export function shuffleDeck(gameId: string, req: PlayerActionRequest): Promise<void> {
  return callGameAction(`${API_BASE}/games/${gameId}/actions/shuffle-deck`, req)
}