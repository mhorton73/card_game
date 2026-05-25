
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from .connection_manager import CONNECTION_MANAGER

from app.game_engine.game_manager import GAME_MANAGER
from app.game_engine.serializers import serialize_broadcast

router = APIRouter()


@router.websocket("/ws/game/{game_id}/{player_id}")
async def game_ws(game_id: str, player_id: str, websocket: WebSocket):
    await CONNECTION_MANAGER.connect(game_id, player_id, websocket)

    try:
        # send initial state
        game = GAME_MANAGER.get_game(game_id)

        initial_state = serialize_broadcast(game, player_id)
        await websocket.send_json(initial_state.model_dump())

        while True:
            # keep connection alive
            await websocket.receive_text()

    except WebSocketDisconnect:
        CONNECTION_MANAGER.disconnect(game_id, player_id)