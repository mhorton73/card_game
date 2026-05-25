
import uuid
from fastapi import APIRouter, HTTPException, Depends

from app.game_engine.game_manager import GAME_MANAGER
from app.game_engine.deck_service import load_deck
from ..database import get_session
from ..schemas import JoinGameRequest
from .connection_manager import CONNECTION_MANAGER


router = APIRouter()

@router.get("/game")
async def get_games():

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

@router.post("/game/create")
async def create_game_route():

    game_id = str(uuid.uuid4())
    GAME_MANAGER.create_game(game_id)

    return {
        "game_id": game_id,
        "status": "created"
    }

@router.post("/game/join")
async def join_game_route(req: JoinGameRequest):
    game = GAME_MANAGER.join_game(
        req.game_id,
        req.player_id,
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
