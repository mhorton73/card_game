
# Future/ potential additions:

# pagination
# sorting
# strong filtering
# versioning


from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import select, func, case, Integer
from sqlalchemy.orm import selectinload

from ..database import get_session
from ..models import CardSet, Card
from ..schemas import (
    SetIn, SetOut,
    SetListResponse, 
    CardIn, CardOut, 
    CardListResponse, 
    CardPatch
)

def serialize_card_set(card_set: CardSet):
    return SetOut(
        id = card_set.id,
        name = card_set.name,
    )

def serialize_card(card: Card):
    return CardOut(
        id = card.id,
        name = card.name,
        cost = card.cost,
        numerical_cost= card.numerical_cost,
        element = card.element,
        card_types = card.card_types,
        subtypes = card.subtypes,
        effect = card.effect,
        flavour_text = card.flavour_text,
        attack = card.attack,
        health = card.health,
        card_set = serialize_card_set(card.card_set)
    )


router = APIRouter()


# -------- Endpoints -------- 

@router.post("/sets", response_model=SetOut, status_code=201)
async def add_set(set_in:SetIn, session = Depends(get_session)):
    new_set = CardSet(
        name = set_in.name
    )
    session.add(new_set)
    session.commit()
    session.refresh(new_set)
    
    return serialize_card_set(new_set)

@router.post("/cards", response_model=CardOut, status_code=201) 
async def add_card(card: CardIn, session = Depends(get_session)): 

    new_card = Card(
        name = card.name,
        cost = card.cost,
        numerical_cost = card.numerical_cost,
        element = card.element,
        card_types = card.card_types,
        subtypes = card.subtypes,
        effect = card.effect,
        flavour_text = card.flavour_text,
        attack = card.attack,
        health = card.health,
        set_id = card.set_id,
        ) 

    session.add(new_card)
    session.commit()
    session.refresh(new_card)

    return serialize_card(new_card)

@router.get("/sets", response_model=SetListResponse, status_code=200)
async def get_sets (session = Depends(get_session)):
    
    card_sets = session.execute(select(CardSet)).scalars().all()
    total = len(card_sets)
    set_list = [
        serialize_card_set(s) for s in card_sets
    ]

    return SetListResponse(total = total, card_sets = set_list)

@router.get("/cards", response_model=CardListResponse, status_code=200)
async def get_cards (set_id: int | None = None, session = Depends(get_session)):
    
    stmt = select(Card)

    if set_id is not None:
        stmt = stmt.where(Card.set_id == set_id)

    # Sorting

    element_sort = case(
        (Card.element[0].astext == "Fire", 0),
        (Card.element[0].astext == "Water", 1),
        (Card.element[0].astext == "Earth", 2),
        (Card.element[0].astext == "Air", 3),
        else_=4,  # empty list or unknown
    )

    type_sort = case(
        (Card.card_types[0].astext == "Creature", 0),
        (Card.card_types[0].astext == "Invocation", 1),
        (Card.card_types[0].astext == "Surge", 1),
        (Card.card_types[0].astext == "Site", 2),
        (Card.card_types[0].astext == "Catalyst", 3),
        else_= 99,  # empty list or unknown
    )

    cost_sort = func.coalesce(Card.numerical_cost.cast(Integer), 99)

    stmt = stmt.order_by(element_sort, type_sort, cost_sort)

    # Finish DB query

    cards = session.execute(
        stmt.options(selectinload(Card.card_set))
    ).scalars().all()
    total = session.execute(
        select(func.count()).select_from(stmt.subquery())
    ).scalar()

    card_list = [
        serialize_card(c) for c in cards
    ]

    return CardListResponse(total = total, cards = card_list)

@router.get("/cards/{id}", response_model=CardOut, status_code=200)
async def get_card (id: int, session = Depends(get_session)):
    
    stmt = select(Card).where(Card.id == id)

    card = session.execute(
        stmt.options(selectinload(Card.card_set))
    ).scalars().one_or_none()

    if card is None:
        raise HTTPException(status_code=404, detial="Card not found")

    return serialize_card(card)

@router.delete("/sets/{id}", status_code=204)
async def delete_set(id: int, session = Depends(get_session)):
    
    card_set = session.get(CardSet, id)
    if card_set is None:
        raise HTTPException(status_code=404, detail="Set not found")

    session.delete(card_set)
    session.commit()



@router.delete("/cards/{id}", status_code=204)
async def delete_card(id: int, session = Depends(get_session)):

    card = session.get(Card, id)
    if card is None:
        raise HTTPException(status_code=404, detail="Card not found")

    session.delete(card)
    session.commit()

@router.put("/sets/{id}", response_model=SetOut, status_code=200)
async def edit_set(id: int, update: SetIn, session = Depends(get_session)):
    card_set = session.get(CardSet, id)
    if card_set is None:
        raise HTTPException(status_code=404, detail="Set not found")
    
    card_set.name = update.name
    session.commit()

    return serialize_card_set(card_set)

@router.patch("/cards/{id}", response_model=CardOut, status_code=200)
async def edit_card(id: int, update: CardPatch, session = Depends(get_session)):
    
    card = session.get(Card, id)
    if card is None:
        raise HTTPException(status_code=404, detail="Card not found")
    
    update_data = update.model_dump(exclude_unset=True)

    if "set_id" in update_data:
        card_set = session.get(CardSet, update_data["set_id"])

        if card_set is None:
            raise HTTPException(status_code=404, detail="Set not found")
        

    for key, value in update_data.items():
        setattr(card, key, value)

    session.commit()
    session.refresh(card)

    return serialize_card(card)
