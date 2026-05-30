
from pydantic import BaseModel, Field

# -------- Card Editor Schemas --------

class SetIn(BaseModel):
    name: str

class SetOut(BaseModel):
    id: int
    name: str

class CardIn(BaseModel):
    name: str
    cost: str | None = None
    numerical_cost: int | None = None
    element: list[str] = Field(default_factory=list)
    card_types: list[str] = Field(default_factory=list)
    subtypes: list[str] = Field(default_factory=list)
    effect: str | None = None
    flavour_text: str | None = None
    attack: int | None = None
    health: int | None = None
    set_id: int

class CardOut(BaseModel):
    id: int
    name: str
    cost: str | None
    numerical_cost: int | None
    element: list[str] = Field(default_factory=list)
    card_types: list[str] = Field(default_factory=list)
    subtypes: list[str] = Field(default_factory=list)
    effect: str | None
    flavour_text: str | None
    attack: int | None
    health: int | None
    card_set: SetOut

class SetListResponse(BaseModel):
    total: int
    card_sets: list[SetOut]
    
class CardListResponse(BaseModel):
    total: int
    cards: list[CardOut]

class CardPatch(BaseModel):
    name: str | None = None
    cost: str | None = None
    numerical_cost: int | None = None
    element: list[str] | None = None
    card_types: list[str] | None = None
    subtypes: list[str] | None = None
    effect: str | None = None
    flavour_text: str | None = None
    attack: int | None = None
    health: int | None = None
    set_id: int | None = None

# -------- Deckbuilder schemas --------

class DeckIn(BaseModel):
    name: str

class DeckSummary(BaseModel):
    id: int
    name: str
    size: int

class DeckCardOut(BaseModel):
    deck_id: int
    deck_name: str
    card_id: int
    card_name: str
    quantity: int

class DeckCollectionResponse(BaseModel):
    total: int
    decks: list[DeckSummary]

class DeckListElement(BaseModel):
    card_id: int
    card_name: str
    quantity: int

class DeckDetailResponse(BaseModel):
    deck_id: int
    deck_name: str
    deck_size: int
    cards: list[DeckListElement]

# -------- Engine schemas --------

class CardInstanceOut(BaseModel):
    instance_id: str
    owner_id: str
    card_id: int
    tapped: bool
    counters: dict[str, int]

class PlayerStateOut(BaseModel):
    player_id: str
    name:str

    life: int = 20
    mana: dict[str, int] = Field(default_factory=lambda: {
        "Fire": 0,
        "Water": 0,
        "Earth": 0,
        "Air": 0
    })

    deck_count: int

    hand: list[CardInstanceOut] = Field(default_factory=list)
    hand_count: int
    graveyard: list[CardInstanceOut] = Field(default_factory=list)
    exile: list[CardInstanceOut] = Field(default_factory=list)

    creatures: list[CardInstanceOut] = Field(default_factory=list)
    catalysts: list[CardInstanceOut] = Field(default_factory=list)
    third_layer: list[CardInstanceOut] = Field(default_factory=list)
    pending: list[CardInstanceOut] = Field(default_factory=list)

class StackItemOut(BaseModel):
    card: CardInstanceOut
    controller_id: str

class GameStateOut(BaseModel):
    game_id: str
    players: list[PlayerStateOut]
    game_started: bool
    turn_number: int
    # active_player_index: int
    stack: list[StackItemOut] = Field(default_factory=list)

class GameStateBroadcast(BaseModel):
    type: str = "game_state"
    state: GameStateOut

class JoinGameRequest(BaseModel):
    # player_id: str
    name: str

class SelectDeckRequest(BaseModel):
    player_id: str
    deck_id: int

class BasicCardActionRequest(BaseModel):
    instance_id: str
    source: str
    source_owner_id: str

class CardCountersRequest(BasicCardActionRequest):
    counter_type: str

class MoveCardRequest(BasicCardActionRequest):
    destination: str
    destination_owner_id: str

class DrawCardsRequest(BaseModel):
    player_id: str
    number: int

class DrawFromBottomRequest(BaseModel):
    player_id: str

class PeekTopNRequest(BaseModel):
    player_id: str
    n: int

class AddToStackRequest(BaseModel):
    player_id:str
    source: str
    instance_id: str

class RemoveFromStackRequest(BaseModel):
    stack_id:str

class PlayerActionRequest(BaseModel):
    player_id: str

class ChangeLifeRequest(PlayerActionRequest):
    amount: int

class SetLifeRequest(PlayerActionRequest):
    life: int

class ChangeManaRequest(PlayerActionRequest):
    element: str
    amount: int