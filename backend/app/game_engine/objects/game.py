
import random
from datetime import datetime, timezone

from .stack_item import StackItem
from .player import Player

class Game:
    def __init__(self, game_id: str, name: str | None = None, seed: int | None = None):
        self.game_id = game_id
        self.name: str = name or f"Game {game_id[:6]}"
        self.created_at = datetime.now(timezone.utc)
        self.rng = random.Random(seed)

        self.players: dict[str, Player]
        self.max_players = 2

        self.stack: list[StackItem] = []
        
        self.game_started = False
        self.turn_number = 1
        # self.active_player_index = 0

    def add_player(self, player: Player):
        if self.players.get(player.player_id):
            raise ValueError("Player already in game")
        if len(self.players) >= self.max_players:
            raise ValueError("Game full")
        self.players[player.player_id] = player

    def shuffle_deck(self, player_id: str):
        player = self.players.get(player_id)
        if player is None:
            raise ValueError("Player not found")
        self.rng.shuffle(player.deck)