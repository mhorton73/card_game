
import uuid
from fastapi import APIRouter, HTTPException, Depends

from app.game_engine.game_manager import GAME_MANAGER
from app.game_engine.deck_service import load_deck
from app.game_engine.serializers import serialize_card_instance
from ..database import get_session
from ..schemas import (
    JoinGameRequest,
    MoveCardRequest,
    DrawCardsRequest,
    PutInDeckRequest,
    DrawFromBottomRequest,
    PeekTopNRequest,
    AddToStackRequest,
    RemoveFromStackRequest,
)
from .connection_manager import CONNECTION_MANAGER
from app.game_engine.actions import(
    move_card as move_card_action,
    draw_cards as draw_cards_action,
    put_on_top as put_on_top_action,
    put_on_bottom as put_on_bottom_action,
    draw_from_bottom as draw_from_bottom_action,
    peek_top_n as peek_top_n_action,
    coin_flip as coin_flip_action,
    add_to_stack as add_to_stack_action,
    remove_from_stack as remove_from_stack_action,
)


router = APIRouter()

@router.get("/games")
async def list_games():

    return [
        {
            "game_id": game.game_id,
            "name": game.name,
            "players": len(game.players),
            "max_players": game.max_players,
            "started": game.game_started,
        }
        for game in GAME_MANAGER.games.values()
    ]

@router.post("/games/create")
async def create_game_route():

    game_id = str(uuid.uuid4())
    GAME_MANAGER.create_game(game_id)

    return {
        "game_id": game_id,
        "status": "created"
    }

@router.post("/games/join")
async def join_game_route(req: JoinGameRequest):
    player_id = str(uuid.uuid4())
    game = GAME_MANAGER.join_game(
        req.game_id,
        player_id,
        req.name
    )

    await CONNECTION_MANAGER.broadcast_gamestate(game)

    return {
        "game_id": game.game_id,
        "players": [
            {"player_id": p.player_id, "name": p.name}
            for p in game.players
        ]
    }

@router.post("/select-deck")
async def select_deck(deck_id: int, game_id: str, player_id: str, session = Depends(get_session)):

    try:
        deck = load_deck(deck_id, player_id, session)
    except Exception:
        raise HTTPException(status_code=404, detail="Deck not found")
    
    GAME_MANAGER.assign_deck(game_id, player_id, deck)

    return{"status": "Deck Assigned"}


@router.post("/games/{game_id}/move-card")
async def move_card(game_id: str, req: MoveCardRequest):

    game = GAME_MANAGER.get_game(game_id)
    move_card_action(game, req)
    await CONNECTION_MANAGER.broadcast_gamestate(game)

    return {"status": "ok"}

@router.post("/games/{game_id}/draw-cards")
async def draw_cards(game_id: str, req: DrawCardsRequest):

    game = GAME_MANAGER.get_game(game_id)
    draw_cards_action(game, req)
    await CONNECTION_MANAGER.broadcast_gamestate(game)

    return {"status": "ok"}

@router.post("/games/{game_id}/put-on-top")
async def put_on_top(game_id: str, req: PutInDeckRequest):

    game = GAME_MANAGER.get_game(game_id)
    put_on_top_action(game, req)
    await CONNECTION_MANAGER.broadcast_gamestate(game)

    return {"status": "ok"}

@router.post("/games/{game_id}/put-on-bottom")
async def put_on_bottom(game_id: str, req: PutInDeckRequest):

    game = GAME_MANAGER.get_game(game_id)
    put_on_bottom_action(game, req)
    await CONNECTION_MANAGER.broadcast_gamestate(game)

    return {"status": "ok"}

@router.post("/games/{game_id}/draw-from-bottom")
async def draw_from_bottom(game_id: str, req: DrawFromBottomRequest):

    game = GAME_MANAGER.get_game(game_id)
    draw_from_bottom_action(game, req.player_id)
    await CONNECTION_MANAGER.broadcast_gamestate(game)

    return {"status": "ok"}

@router.post("/games/{game_id}/peek-top-n")
async def peek_top_n(game_id: str, req: PeekTopNRequest):

    game = GAME_MANAGER.get_game(game_id)
    cards = peek_top_n_action(game, req)
    serialized = [serialize_card_instance(c) for c in cards]
    return {
        "status": "ok",
        "cards": serialized
    }

@router.post("/games/{game_id}/coin-flip")
async def coin_flip_route(game_id: str):

    game = GAME_MANAGER.get_game(game_id)

    result = coin_flip_action(game)

    await CONNECTION_MANAGER.broadcast_event(
        game_id,
        {
            "type": "coin_flip",
            "result": result
        }
    )

    return {"result": result}

@router.post("/games/{game_id}/add-to-stack")
async def add_to_stack(game_id: str, req:AddToStackRequest):

    game = GAME_MANAGER.get_game(game_id)
    add_to_stack_action(game, req)
    await CONNECTION_MANAGER.broadcast_gamestate(game)

    return {"status": "ok"}

@router.post("/games/{game_id}/remove-from-stack")
async def remove_from_stack(game_id: str, req:RemoveFromStackRequest):

    game = GAME_MANAGER.get_game(game_id)
    remove_from_stack_action(game, req)
    await CONNECTION_MANAGER.broadcast_gamestate(game)

    return {"status": "ok"}