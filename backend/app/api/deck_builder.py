from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload

from ..database import get_session
from ..models import Card, Deck, DeckCard
from ..schemas import (
    DeckIn,
    DeckOut,
    DeckResponse,
    DeckCollectionResponse,
    DeckCardOut,
    DeckCardResponse,
    DeckListElement,
    DeckDetailResponse,
)


def serialize_deck(deck: Deck):
    return DeckOut(
        id = deck.id,
        name = deck.name
    )

def serialize_deck_card(deck_card: DeckCard, deck_name: str, card_name: str):
    return DeckCardOut(
        deck_id = deck_card.deck_id,
        deck_name = deck_name,
        card_id = deck_card.card_id,
        card_name = card_name,
        quantity = deck_card.quantity
    )


router = APIRouter(prefix="/deck-builder", tags = ["deck-builder"])


# -------- Endpoints -------- 


@router.post("/decks", response_model=DeckResponse, status_code=201)
async def add_deck(deck_in:DeckIn, session = Depends(get_session)):
    new_deck = Deck(
        name = deck_in.name
    )
    session.add(new_deck)
    session.commit()
    session.refresh(new_deck)
    
    return DeckResponse(status="added", data = serialize_deck(new_deck))

@router.post("/decks/{deck_id}/cards/{card_id}", response_model=DeckCardResponse, status_code=201)
async def add_deck_card_copy(deck_id: int, card_id: int, session = Depends(get_session)):
    
    deck = session.get(Deck, deck_id)
    if not deck:
        raise HTTPException(404, "Deck not found")

    card = session.get(Card, card_id)
    if not card:
        raise HTTPException(404, "Card not found")
    
    existing = session.get(DeckCard, (deck_id, card_id))

    if existing:
        existing.quantity += 1
        deck_card = existing
    else:
        deck_card = DeckCard(
            deck_id = deck_id,
            card_id = card_id,
            quantity = 1
        )
        session.add(deck_card)

    session.commit()
    session.refresh(deck_card)
    
    return DeckCardResponse(
        status="added", 
        data = serialize_deck_card(deck_card, deck.name, card.name)
    )

@router.delete("/decks/{deck_id}", response_model=DeckResponse, status_code=200)
async def delete_deck(deck_id: int, session = Depends(get_session)):
    
    deck = session.get(Deck, deck_id)
    if not deck:
        raise HTTPException(404, "Deck not found")

    removed_deck= serialize_deck(deck)
    session.delete(deck)
    session.commit()
    
    return DeckResponse(status="removed", data = removed_deck)

@router.delete("/decks/{deck_id}/cards/{card_id}", response_model=DeckCardResponse, status_code=200)
async def remove_deck_card_copy(deck_id: int, card_id: int, session = Depends(get_session)):
    
    deck_card = session.execute(
        select(DeckCard)
        .where(DeckCard.deck_id == deck_id, DeckCard.card_id == card_id )
        .options(selectinload(DeckCard.deck),selectinload(DeckCard.card))
    ).scalar_one_or_none()
    if not deck_card:
        raise HTTPException(404, "Card not in deck")
    
    
    deck_card.quantity -= 1
    removed_deck_card = serialize_deck_card(deck_card, deck_card.deck.name, deck_card.card.name)
    if deck_card.quantity == 0:
        session.delete(deck_card)

    session.commit()
    
    return DeckCardResponse(status="removed", data = removed_deck_card)

@router.get("/decks", response_model=DeckCollectionResponse, status_code=200)
async def get_decks (session = Depends(get_session)):
    
    decks = session.execute(select(Deck)).scalars().all()

    total = session.execute(
        select(func.count()).select_from(Deck)
    ).scalar_one()

    return DeckCollectionResponse(
        total = total,
        decks = [serialize_deck(d) for d in decks]
        )

@router.get("/decks/{id}", response_model=DeckDetailResponse, status_code=200)
async def get_decklist (id: int, session = Depends(get_session)):
    
    deck = session.execute(
        select(Deck)
        .where(Deck.id == id)
        .options(selectinload(Deck.cards).selectinload(DeckCard.card))
    ).scalar_one_or_none()

    if not deck:
        raise HTTPException(404, "Deck not found")

    deck_list = []
    deck_size = 0

    for c in deck.cards:
        deck_list_element = DeckListElement(
            card_id=c.card_id,
            card_name = c.card.name,
            quantity=c.quantity
        )
        deck_list.append(deck_list_element)
        deck_size += c.quantity

    return DeckDetailResponse(
        deck_id=deck.id,
        deck_name=deck.name,
        deck_size=deck_size,
        cards = deck_list,
    )

@router.put("/decks/{id}", response_model=DeckResponse, status_code=200)
async def update_deck(id: int, update: DeckIn, session = Depends(get_session)):
    
    deck = session.get(Deck, id)
    if not deck:
        raise HTTPException(404, "Deck not found")
    deck.name = update.name
    session.commit()

    return DeckResponse(status="updated", data = serialize_deck(deck))

@router.post("/decks/{id}", response_model=DeckResponse, status_code=201)
async def clone_deck(id:int, session = Depends(get_session)):
    
    deck = session.execute(
        select(Deck)
        .where(Deck.id == id)
        .options(selectinload(Deck.cards))
    ).scalar_one_or_none()
    if not deck:
        raise HTTPException(404, "Deck not found")    
    
    duplicate_deck = Deck(
        name = deck.name +" (copy)"
    )
    session.add(duplicate_deck)
    session.flush()

    for c in deck.cards:
        session.add(DeckCard(
            deck_id = duplicate_deck.id,
            card_id = c.card_id,
            quantity = c.quantity,
        ))

    session.commit()
    session.refresh(duplicate_deck)
    
    return DeckResponse(status="cloned", data = serialize_deck(duplicate_deck))