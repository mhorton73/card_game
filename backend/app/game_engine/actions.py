
import uuid

from .objects.game import Game
from .objects.player import Player
from .objects.card_instance import CardInstance
from .objects.stack_item import StackItem
from app.schemas import(
    MoveCardRequest,
    DrawCardsRequest,
    DrawFromBottomRequest,
    BasicCardActionRequest,
    PeekTopNRequest,
    AddToStackRequest,
    RemoveFromStackRequest,
    CardCountersRequest,
    PlayerActionRequest,
    ChangeLifeRequest,
    SetLifeRequest,
    ChangeManaRequest,
)

VALID_ZONES = {
    "deck",
    "hand",
    "graveyard",
    "exile",
    "creatures",
    "catalysts",
    "third_layer",
    "pending",
}

# Helper functions for grabbing objects and validation

def resolve_zone(player: Player, zone_name: str):
    if zone_name not in VALID_ZONES:
        raise ValueError(f"Invalid zone: {zone_name}")

    return getattr(player, zone_name)

def resolve_player(game: Game, player_id: str):
    player = game.players.get(player_id)

    if player is None:
        raise ValueError("Player not found")

    return player

def resolve_card(zone: list[CardInstance], instance_id: str):
    card = next((c for c in zone if c.instance_id == instance_id), None)

    if card is None:
        raise ValueError("Card not found in zone")
    
    return card

def resolve_zone_context(game: Game, zone_owner_id: str, zone_name: str):
    zone_owner = resolve_player(game, zone_owner_id)
    zone = resolve_zone(zone_owner, zone_name)

    return zone_owner, zone

def resolve_card_context(game: Game, source_owner_id: str, source: str, instance_id: str):
    source_owner, source_zone = resolve_zone_context(game, source_owner_id, source)
    card = resolve_card(source_zone, instance_id)

    return source_owner, source_zone, card



# -------- Game actions --------

def move_card(game: Game, req:MoveCardRequest):
    _, source_zone, card = resolve_card_context(game, req.source_owner_id, req.source, req.instance_id)
    
    _, destination_zone = resolve_zone_context(game, req.destination_owner_id, req.destination)
    
    source_zone.remove(card)
    destination_zone.append(card)
    
def draw_cards(game: Game, req: DrawCardsRequest):
    player = resolve_player(game, req.player_id)
    for i in range(req.number):
        if not player.deck:
            return
        
        card = player.deck.pop()
        player.hand.append(card)

def put_on_top(game: Game, req:BasicCardActionRequest):
    _, source_zone, card = resolve_card_context(game, req.source_owner_id, req.source, req.instance_id)
    _, deck  = resolve_zone_context(game, card.owner_id, "deck")
    source_zone.remove(card)
    deck.append(card)

def put_on_bottom(game: Game, req:BasicCardActionRequest):
    _, source_zone, card = resolve_card_context(game, req.source_owner_id, req.source, req.instance_id)
    _, deck  = resolve_zone_context(game, card.owner_id, "deck")
    source_zone.remove(card)
    deck.insert(0, card)

def draw_from_bottom(game: Game, req: DrawFromBottomRequest):
    player = resolve_player(game, req.player_id)
    
    if not player.deck:
        return
    
    card = player.deck.pop(0)
    player.hand.append(card)
    
def peek_top_n(game: Game, req: PeekTopNRequest):
    player = resolve_player(game, req.player_id)
    return player.deck[-req.n:]

#

# def remove_cards_from_deck(player:Player, cards: list[CardInstance]):
#     card_ids = {c.instance_id for c in cards}
#     player.deck = [
#         c for c in player.deck
#         if c.instance_id not in card_ids
#     ]


def coin_flip(game: Game):
    result = "heads" if game.rng.random() < 0.5 else "tails"
    print(f"Coin flip: {result}")
    return result

# alternative coin flip style
# def coin_flip():
#     return random.choice(["heads", "tails"])

def add_to_stack(game: Game, req: AddToStackRequest):
    _, _, card = resolve_card_context(game, req.source_owner_id, req.source, req.instance_id)
    stack_id = str(uuid.uuid4())
    stack_item = StackItem(
        stack_id = stack_id,
        card = card,
        controller_id=req.player_id
    )
    game.stack.append(stack_item)
    

def remove_from_stack(game: Game, req: RemoveFromStackRequest):
    
    stack_item = next((c for c in game.stack if c.stack_id == req.stack_id), None)

    if stack_item not in game.stack:
        raise ValueError("Stack item not in stack")
    
    game.stack.remove(stack_item)

def tap_card(game: Game, req: BasicCardActionRequest):
    _, _, card = resolve_card_context(game, req.source_owner_id, req.source, req.instance_id)
    card.tap()

def untap_card(game: Game, req: BasicCardActionRequest):
    _, _, card = resolve_card_context(game, req.source_owner_id, req.source, req.instance_id)
    card.untap()

def add_counter(game: Game, req: CardCountersRequest):
    _, _, card = resolve_card_context(game, req.source_owner_id, req.source, req.instance_id)
    card.add_counter(req.counter_type)

def remove_counter(game: Game, req: CardCountersRequest):
    _, _, card = resolve_card_context(game, req.source_owner_id, req.source, req.instance_id)
    card.remove_counter(req.counter_type)

def change_life(game: Game, req: ChangeLifeRequest):
    player = resolve_player(game, req.player_id)
    player.change_life(req.amount)

def set_life(game: Game, req: SetLifeRequest):
    player = resolve_player(game, req.player_id)
    player.set_life(req.life)

def change_mana(game: Game, req: ChangeManaRequest):
    player = resolve_player(game, req.player_id)
    player.change_mana(req.element, req.amount)

def clear_mana(game: Game, req: PlayerActionRequest):
    player = resolve_player(game, req.player_id)
    player.clear_mana()