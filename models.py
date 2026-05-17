
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship, validates
from .database import Base

ALLOWED_TYPES = {
    "Catalyst",
    "Creature",
    "Spell",
}

ALLOWED_SUBTYPES = {
    "Dragon",
}

ALLOWED_ELEMENTS ={
    "Fire",
    "Water",
    "Earth",
    "Air",
}

class CardSet(Base):
    __tablename__ = "card_sets"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]

    cards: Mapped[list["Card"]] = relationship(
        back_populates="set", 
        cascade="all, delete-orphan"
    )

class Card(Base):
    __tablename__ = "cards"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    mana_cost: Mapped[str | None]
    element: Mapped[str | None]
    card_types: Mapped[list[str]]
    subtypes: Mapped[list[str]]
    effect: Mapped[str | None]
    flavour_text: Mapped[str | None]
    attack: Mapped[int | None]
    health: Mapped[int | None]

    card_set: Mapped["CardSet"] = relationship(back_populates="cards")
    set_id: Mapped[int] = mapped_column(ForeignKey("card_sets.id"))

    @validates( "element", "card_types", "subtypes")
    def validate_typeline(self, key, value):
        if value is None:
            return value
        
        if key == "element":
            allowed = ALLOWED_ELEMENTS
        elif key == "card_types":
            allowed = ALLOWED_TYPES
        elif key == "subtypes":
            allowed = ALLOWED_SUBTYPES
        else:
            return value

        invalid = set(value) - allowed
        if invalid:
            raise ValueError(f"Invalid {key}: {invalid}")
        return value
    
class Deck(Base):
    __tablename__ = "decks"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]

    cards: Mapped[list["DeckCard"]] = relationship(
        back_populates="deck",
        cascade="all, delete-orphan"
    )

class DeckCard(Base):
    __tablename__ = "deck_cards"

    deck_id: Mapped[int] = mapped_column(ForeignKey("decks.id"), primary_key=True)
    card_id: Mapped[int] = mapped_column(ForeignKey("cards.id"), primary_key=True)

    quantity: Mapped[int] = mapped_column(default=1)

    deck: Mapped["Deck"] = relationship(back_populates="cards")
    card: Mapped["Card"] = relationship()

    @validates("quantity")
    def validate_quantity(self, key, value):
        if value < 0:
            raise ValueError("Quantity cannot be negative")
        return value