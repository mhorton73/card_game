
from dataclasses import dataclass

from card_instance import CardInstance

@dataclass
class StackItem:
    card: CardInstance
    controller_id: str