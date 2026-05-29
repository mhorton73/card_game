
export type CardSet = {
  id: number
  name: string
}

export type SetListResponse = {
  total: number
  card_sets: CardSet[]
}

export type CardIn ={
  name: string
  cost: string | null
  numerical_cost: number | null
  element: string[]
  card_types: string[]
  subtypes: string[]
  effect: string | null
  flavour_text: string | null
  attack: number | null
  health: number | null
  set_id: number
}

export type Card = {
  id: number
  name: string
  cost?: string | null
  numerical_cost?: number | null
  element: string[]
  card_types: string[]
  subtypes: string[]
  effect?: string | null
  flavour_text?: string | null
  attack?: number | null
  health?: number | null
  card_set: CardSet
}

export type CardListResponse = {
  total: number
  cards: Card[]
}

// Deck Builder Types

export type DeckIn = {
  name: string
}

export type Deck = {
  id: number
  name: string
  size: number
}

export type DeckCard = {
  deck_id: number
  deck_name: string
  card_id: number
  card_name: string
  quantity: number
}

export type DeckListElement = {
  card_id: number
  card_name: string
  quantity: number
}

export type DeckDetail = {
  deck_id: number
  deck_name: string
  deck_size: number
  cards: DeckListElement[]
}

export type DeckCollectionResponse = {
  total: number
  decks: Deck[]
}