
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from dataclasses import dataclass
from ..models import Deck
from .objects.card_instance import CardInstance
import uuid

@dataclass
class DeckInstance:
    deck_id: int
    deck_name: str
    deck_list: list[CardInstance]

def generate_instance_id() -> str:
    return str(uuid.uuid4())

def load_deck(deck_id: int, player_id:str, session):
    
    stmt = select(Deck).where(Deck.id == deck_id)
    db_deck = session.execute(
        stmt.options(selectinload(Deck.cards))
    ).scalars().one_or_none()
    if db_deck is None:
        raise Exception("Deck not found")

    deck_list = []

    for c in db_deck.cards:
        for _ in range(c.quantity):
            card_instance = CardInstance(
                instance_id = generate_instance_id(),
                owner_id = player_id,
                card_id = c.card_id,
            )
            deck_list.append(card_instance)
    
    return DeckInstance(
        deck_id = db_deck.id, 
        deck_name = db_deck.name, 
        deck_list = deck_list
    )
        
