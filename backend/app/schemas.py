
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

class SetResponse(BaseModel):
    status: str
    data: SetOut

class CardResponse(BaseModel):
    status: str
    data: CardOut

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

class DeckOut(BaseModel):
    id: int
    name: str

class DeckCardOut(BaseModel):
    deck_id: int
    deck_name: str
    card_id: int
    card_name: str
    quantity: int

class DeckResponse(BaseModel):
    status: str
    data: DeckOut

class DeckCardResponse(BaseModel):
    status: str
    data: DeckCardOut

class DeckCollectionResponse(BaseModel):
    total: int
    decks: list[DeckOut]

class DeckListElement(BaseModel):
    card_id: int
    card_name: str
    quantity: int

class DeckDetailResponse(BaseModel):
    deck_id: int
    deck_name: str
    deck_size: int
    cards: list[DeckListElement]
