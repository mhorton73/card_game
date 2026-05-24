
import random

from card_instance import CardInstance
from player import Player

class Game:
    def __init__(self, game_id: str, seed: int | None = None):
        self.game_id = game_id
        self.rng = random.Random(seed)

        self.players = list[Player] = []
        self.max_players = 2

        self.stack = list[CardInstance] = []
        
        self.game_started = False
        self.turn_number = 1
        # self.active_player_index = 0

    def add_player(self, player):
        if (p.player_id == player.player_id for p in self.players):
            raise ValueError("Player already in game")
        if len(self.players) >= self.max_players:
            raise ValueError("Game full")
        self.players.append(player)

    def shuffle_deck(self, player: Player):
        if player.player_id not in [p.player_id for p in self.players]:
            raise ValueError("Player not found")
        self.rng.shuffle(player.deck)