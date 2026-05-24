
from objects.game import Game
from objects.player import Player
from objects.card_instance import CardInstance
from objects.stack_item import StackItem

def move_card(game: Game, card: CardInstance, source, destination):
    if card not in source:
        raise ValueError("Card not in source zone")
    
    source.remove(card)
    destination.append(card)
    
    print(f"MOVE: {card.name} -> {destination}")

def draw_cards(game: Game, player: Player, number: int):
    for i in range(number):
        if not player.deck:
            return()
        
        card = player.deck.pop()
        player.hand.append(card)

def put_on_top(game: Game, card: CardInstance, source, deck):
    if card not in source:
        raise ValueError("Card not in source zone")
    
    source.remove(card)
    deck.append(card)

def put_on_bottom(game: Game, card: CardInstance, source, deck):
    if card not in source:
        raise ValueError("Card not in source zone")
    
    source.remove(card)
    deck.insert(0, card)

def draw_from_bottom(game: Game, player: Player):
    if not player.deck:
        return()
    
    card = player.deck.pop(0)
    player.hand.append(card)
    
def peek_top_n(player:Player, n: int):
    return player.deck[-n:]

def remove_cards_from_deck(player:Player, cards: list[CardInstance]):
    card_ids = {c.instance_id for c in cards}
    player.deck = [
        c for c in player.deck
        if c.instance_id not in card_ids
    ]


def coin_flip(game: Game):
    result = "heads" if game.rng.random() < 0.5 else "tails"
    print(f"Coin flip: {result}")
    return result

# alternative coin flip style
# def coin_flip():
#     return random.choice(["heads", "tails"])

def add_to_stack(game: Game, player: Player, card: CardInstance):
    
    stack_item = StackItem(
        card = card,
        controller_id=player.player_id
    )
    game.stack.append(stack_item)
    
    print(f"{card.name} added to stack")

def remove_from_stack(game: Game, stack_item: StackItem):
    if stack_item not in game.stack:
        raise ValueError("Stack item not in stack")
    
    game.stack.remove(stack_item)

    print(f"{stack_item.card.name} removed from stack")
