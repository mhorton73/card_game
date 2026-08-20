
export type SetIn ={
  name: string
}

export type SetOut = {
  id: number
  name: string
}

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

// Gamestate types

export type CardInstanceOut = {
  instance_id: string
  owner_id: string
  card_id: number
  tapped: boolean
  counters: Record<string, number>
}

export type CardInstancePackage ={
  instance: CardInstanceOut
  card: Card
}

export type PlayerStateOut = {
  player_id: string
  name: string
  life: number
  mana: Record<string, number>

  deck_count: number
  hand: CardInstanceOut[]
  hand_count: number
  graveyard: CardInstanceOut[]
  exile: CardInstanceOut[]

  creatures: CardInstanceOut[]
  catalysts: CardInstanceOut[]
  third_layer: CardInstanceOut[]
  pending: CardInstanceOut[]
}

export type ProcessedPlayerState = {
  player_id: string
  name: string
  life: number
  mana: Record<string, number>

  deck_count: number
  hand: CardInstancePackage[]
  hand_count: number
  graveyard: CardInstancePackage[]
  exile: CardInstancePackage[]

  creatures: CardInstancePackage[]
  catalysts: CardInstancePackage[]
  third_layer: CardInstancePackage[]
  pending: CardInstancePackage[]
}

export type StackItemOut = {
  card: CardInstanceOut
  controller_id: string
}

export type ProcessedStackItem = {
  card: CardInstancePackage
  controller_id: string
}

export type GameStateOut = {
  game_id: string
  players: PlayerStateOut[]
  game_started: boolean
  turn_number: number
  stack: StackItemOut[]
}

export type ProcessedGameState = {
  game_id: string
  players: ProcessedPlayerState[]
  game_started: boolean
  turn_number: number
  stack: ProcessedStackItem[]
}

export type GameStateBroadcast = {
  type: "game_state"
  state: GameStateOut
}

// Game Action input types

export type ZoneName =
  | "deck"
  | "hand"
  | "graveyard"
  | "exile"
  | "creatures"
  | "catalysts"
  | "third_layer"
  | "pending"

export type CardContext = {
  instance_id: string
  zone: ZoneName
  owner_id: string
  opponent_id: string
}

// Game Route Requests

export type GameLobbyListing = {
  game_id: string
  name: string
  players: number
  max_players: number
  started: boolean
}

export type CreateGameRequest = {
  name: string
}

export type CreateGameResponse = {
  game_id: string
  status: string
}

export type JoinGameRequest = {
  player_id: string
  name: string
}

export type SelectDeckRequest = {
  player_id: string
  deck_id: number
}

// Card Action Requests

export type BasicCardActionRequest = {
  instance_id: string
  source: string
  source_owner_id: string
}

export type CardCountersRequest = {
  instance_id: string
  source: string
  source_owner_id: string
  counter_type: string
}

export type MoveCardRequest = {
  instance_id: string
  source: string
  source_owner_id: string
  destination: string
  destination_owner_id: string
}

export type DrawCardsRequest = {
  player_id: string
  number: number
}

export type DrawFromBottomRequest = {
  player_id: string
}

export type PeekTopNRequest = {
  player_id: string
  n: number
}

export type AddToStackRequest = {
  player_id: string
  source: string
  source_owner_id: string
  instance_id: string
}

export type RemoveFromStackRequest = {
  stack_id: string
}

export type PlayerActionRequest = {
  player_id: string
}

export type ChangeLifeRequest = {
  player_id: string
  amount: number
}

export type SetLifeRequest = {
  player_id: string
  life: number
}

export type ChangeManaRequest = {
  player_id: string
  element: string
  amount: number
}