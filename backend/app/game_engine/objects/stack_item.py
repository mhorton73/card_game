
from dataclasses import dataclass

from .card_instance import CardInstance

@dataclass
class StackItem:
    stack_id: str
    card: CardInstance
    controller_id: str