
from fastapi import WebSocket
from collections import defaultdict
from app.game_engine.objects.game import Game
from app.game_engine.serializers import serialize_broadcast


class ConnectionManager:
    def __init__(self):
        self.connections: dict[str, dict[str, WebSocket]] = defaultdict(dict)

    async def connect(self, game_id: str, player_id: str, websocket: WebSocket):
        await websocket.accept()
        self.connections[game_id][player_id] = websocket

    def disconnect(self, game_id: str, player_id: str):
        self.connections[game_id].pop(player_id, None)

    async def broadcast_event(self, game_id: str, payload: dict):
        for ws in self.connections[game_id].values():
            await ws.send_json(payload)
        
    async def broadcast_gamestate(self, game: Game):
        for player_id, websocket in self.connections[game.game_id].items():
            gamestate = serialize_broadcast(game, player_id)
            await websocket.send_json(gamestate.model_dump())


CONNECTION_MANAGER = ConnectionManager()