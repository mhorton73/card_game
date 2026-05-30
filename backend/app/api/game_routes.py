
import uuid
from fastapi import APIRouter, HTTPException, Depends
from typing import Callable, TypeVar

from app.game_engine.game_manager import GAME_MANAGER
from app.game_engine.deck_service import load_deck
from app.game_engine.serializers import serialize_card_instance
from ..database import get_session
from ..schemas import (
    JoinGameRequest,
    MoveCardRequest,
    DrawCardsRequest,
    BasicCardActionRequest,
    DrawFromBottomRequest,
    PeekTopNRequest,
    AddToStackRequest,
    RemoveFromStackRequest,
    CardCountersRequest,
    ChangeLifeRequest,
    SetLifeRequest,
    ChangeManaRequest,
    PlayerActionRequest,
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
    tap_card as tap_card_action,
    untap_card as untap_card_action,
    add_counter as add_counter_action,
    remove_counter as remove_counter_action,
    change_life as change_life_action,
    set_life as set_life_action,
    change_mana as change_mana_action,
    clear_mana as clear_mana_action,
)

T = TypeVar("T")

async def run_game_action(
    game_id: str,
    action_fn: Callable[..., T],
    *,
    request=None,
    broadcast_state: bool = True,
):
    game = GAME_MANAGER.get_game(game_id)
    result = action_fn(game, request) if request is not None else action_fn(game)

    if broadcast_state:
        await CONNECTION_MANAGER.broadcast_gamestate(game)
    return result



router = APIRouter()

# Endpoints

# -------- Lobby actions ---------

@router.get("/games", status_code=200)
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

@router.post("/games/create", status_code=201)
async def create_game_route():

    game_id = str(uuid.uuid4())
    GAME_MANAGER.create_game(game_id)

    return {
        "game_id": game_id,
        "status": "created"
    }

@router.post("/games/join", status_code=200)
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

@router.post("/select-deck", status_code=200)
async def select_deck(deck_id: int, game_id: str, player_id: str, session = Depends(get_session)):

    try:
        deck = load_deck(deck_id, player_id, session)
    except Exception:
        raise HTTPException(status_code=404, detail="Deck not found")
    
    GAME_MANAGER.assign_deck(game_id, player_id, deck)

    return{"status": "Deck Assigned"}

# -------- Game actions ---------

@router.post("/games/{game_id}/actions/move-card", status_code=200)
async def move_card(game_id: str, req: MoveCardRequest):

    run_game_action(game_id, move_card_action, request = req)
    return {"status": "ok"}

@router.post("/games/{game_id}/actions/draw-cards", status_code=200)
async def draw_cards(game_id: str, req: DrawCardsRequest):

    run_game_action(game_id, draw_cards_action, request = req)
    return {"status": "ok"}

@router.post("/games/{game_id}/actions/put-on-top", status_code=200)
async def put_on_top(game_id: str, req: BasicCardActionRequest):

    run_game_action(game_id, put_on_top_action, request = req)
    return {"status": "ok"}

@router.post("/games/{game_id}/actions/put-on-bottom", status_code=200)
async def put_on_bottom(game_id: str, req: BasicCardActionRequest):

    run_game_action(game_id, put_on_bottom_action, request = req)
    return {"status": "ok"}

@router.post("/games/{game_id}/actions/draw-from-bottom", status_code=200)
async def draw_from_bottom(game_id: str, req: DrawFromBottomRequest):

    run_game_action(game_id, draw_from_bottom_action, request = req)

    return {"status": "ok"}

@router.post("/games/{game_id}/actions/peek-top-n", status_code=200)
async def peek_top_n(game_id: str, req: PeekTopNRequest):

    cards = run_game_action(game_id, peek_top_n_action, broadcast_state=False)
    serialized = [serialize_card_instance(c) for c in cards]

    # Let people know that the player is peeking
    await CONNECTION_MANAGER.broadcast_event(
        game_id,
        {
            "type": "peek_top_n",
            "player_id": req.player_id,
            "count": req.count,
        }
    )

    return {
        "status": "ok",
        "cards": serialized
    }

@router.post("/games/{game_id}/actions/coin-flip", status_code=200)
async def coin_flip_route(game_id: str):

    result = run_game_action(game_id, coin_flip_action, broadcast_state=False)

    await CONNECTION_MANAGER.broadcast_event(
        game_id,
        {
            "type": "coin_flip",
            "result": result
        }
    )

    return {"result": result}

@router.post("/games/{game_id}/actions/add-to-stack", status_code=200)
async def add_to_stack(game_id: str, req:AddToStackRequest):

    run_game_action(game_id, add_to_stack_action, request = req)

    return {"status": "ok"}

@router.post("/games/{game_id}/actions/remove-from-stack", status_code=200)
async def remove_from_stack(game_id: str, req:RemoveFromStackRequest):

    run_game_action(game_id, remove_from_stack_action, request = req)
    return {"status": "ok"}

@router.post("/games/{game_id}/actions/tap-card", status_code=200)
async def tap_card(game_id: str, req: BasicCardActionRequest):

    run_game_action(game_id, tap_card_action, request = req)
    return {"status": "ok"}

@router.post("/games/{game_id}/actions/untap-card", status_code=200)
async def untap_card(game_id: str, req: BasicCardActionRequest):

    run_game_action(game_id, untap_card_action, request = req)
    return {"status": "ok"}

@router.post("/games/{game_id}/actions/add-counter", status_code=200)
async def add_counter(game_id: str, req: CardCountersRequest):

    run_game_action(game_id, add_counter_action, request = req)
    return {"status": "ok"}

@router.post("/games/{game_id}/actions/remove-counter", status_code=200)
async def remove_counter(game_id: str, req: CardCountersRequest):

    run_game_action(game_id, remove_counter_action, request = req)
    return {"status": "ok"}

@router.post("/games/{game_id}/actions/change-life", status_code=200)
async def change_life(game_id: str, req: ChangeLifeRequest):

    run_game_action(game_id, change_life_action, request = req)
    return {"status": "ok"}

@router.post("/games/{game_id}/actions/set-life", status_code=200)
async def set_life(game_id: str, req: SetLifeRequest):

    run_game_action(game_id, set_life_action, request = req)
    return {"status": "ok"}

@router.post("/games/{game_id}/actions/change-mana", status_code=200)
async def change_mana(game_id: str, req: ChangeManaRequest):

    run_game_action(game_id, change_mana_action, request = req)
    return {"status": "ok"}

@router.post("/games/{game_id}/actions/clear-mana", status_code=200)
async def clear_mana(game_id: str, req: PlayerActionRequest):

    run_game_action(game_id, clear_mana_action, request = req)
    return {"status": "ok"}