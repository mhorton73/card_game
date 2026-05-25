
from .objects.game import Game
from .objects.player import Player
from .objects.card_instance import CardInstance

class GameManager:
    def __init__(self):
        self.games: dict[str, Game] = {}

    def game_exists(self, game_id: str):
        return game_id in self.games         

    def create_game(self, game_id: str):
        if self.game_exists(game_id):
            raise ValueError("Game already exists") 
        game = Game(game_id)
        self.games[game_id]=game
        return game

    def get_game(self, game_id: str):
        try:
            return self.games[game_id]
        except KeyError:
            raise ValueError("Cannot find game")

    def delete_game(self, game_id: str):
        if not self.game_exists(game_id):
            raise ValueError("Cannot find game") 
        self.games.pop(game_id)

    def join_game(self, game_id: str, player_id: str, name: str):
        if not self.game_exists(game_id):
            raise ValueError("Cannot find game") 
        game = self.get_game(game_id)
        player = Player(player_id, name)
        game.add_player(player)
        return game
    
    def assign_deck(self, game_id: str, player_id: str, deck: list[CardInstance]):
        if not self.game_exists(game_id):
            raise ValueError("Cannot find game") 
        game = self.get_game(game_id)
        player = game.players.get(player_id)
        if player is None:
            raise ValueError("Player not found")
        player.deck = deck

    def start_game(self, game_id: str):
        if not self.game_exists(game_id):
            raise ValueError("Cannot find game") 
        game = self.get_game(game_id)
        for p in game.players.values():
            game.shuffle_deck(p)
        game.game_started = True
        return game

GAME_MANAGER = GameManager()