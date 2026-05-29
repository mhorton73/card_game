
export type CardSet = {
  id: number
  name: string
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

export type Deck = {
  id: number
  name: string
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