
from pydantic import BaseModel

# -------- Card Editor Schemas --------

class SetIn(BaseModel):
    name: str

class SetOut(BaseModel):
    id: int
    name: str

class CardIn(BaseModel):
    name: str
    mana_cost: str | None
    element: str | None
    card_types: list[str]
    subtypes: list[str]
    effect: str | None
    flavour_text: str | None
    attack: int | None
    health: int | None
    set_id: int

class CardOut(BaseModel):
    id: int
    name: str
    mana_cost: str | None
    element: str | None
    card_types: list[str]
    subtypes: list[str]
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
    mana_cost: str | None = None
    element: str | None = None
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
    deck_id: str
    deck_name: str
    deck_size: int
    cards: list[DeckListElement]
