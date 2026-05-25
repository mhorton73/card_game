
from objects.game import Game
from objects.card_instance import CardInstance
from objects.player import Player
from objects.stack_item import StackItem
from ..schemas import CardInstanceOut, PlayerStateOut, GameStateOut, StackItemOut, GameStateBroadcast

def serialize_card_instance(card: CardInstance):
    return CardInstanceOut(
        instance_id = card.instance_id,
        owner_id = card.owner_id,
        card_id = card.card_id,
        tapped = card.tapped,
        counters = card.counters,
    )

def serialize_zone(zone: list[CardInstance]):
    return [serialize_card_instance(c) for c in zone]

def serialize_player_state(player: Player, viewer_id: str):
    hand =[]
    if viewer_id == player.player_id:
            hand = serialize_zone(player.hand)
    return PlayerStateOut(
        player_id = player.player_id,
        name = player.name,
        life = player.life,
        mana = player.mana,
        deck_count= len(player.deck),
        hand = hand,
        hand_count= len(player.hand),
        graveyard = serialize_zone(player.graveyard),
        exile = serialize_zone(player.exile),
        creatures = serialize_zone(player.creatures),
        catalysts = serialize_zone(player.catalysts),
        third_layer = serialize_zone(player.third_layer),
        pending = serialize_zone(player.pending),
    )

def serialize_stack_item(item: StackItem):
    return StackItemOut(
        card = serialize_card_instance(item.card),
        controller_id = item.controller_id
    )

def serialize_gamestate(game: Game, viewer_id: str):
    return GameStateOut(
        game_id = game.game_id,
        players = [serialize_player_state(p, viewer_id) for p in game.players.values()],
        game_started = game.game_started,
        turn_number = game.turn_number,
        stack = [serialize_stack_item(c) for c in game.stack],
    )

def serialize_broadcast(game: Game, viewer_id: str):
    state = serialize_gamestate(game, viewer_id)
    return GameStateBroadcast(
        state = state
    )
