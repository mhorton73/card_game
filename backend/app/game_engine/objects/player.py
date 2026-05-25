
from dataclasses import dataclass, field

from .card_instance import CardInstance

@dataclass
class Player:
    player_id: str
    name:str

    life: int = 20
    mana: dict[str, int] = field(default_factory=lambda: {
        "Fire": 0,
        "Water": 0,
        "Earth": 0,
        "Air": 0
    })

    deck: list[CardInstance] = field(default_factory=list)
    sideboard: list[CardInstance] = field(default_factory=list)

    hand: list[CardInstance] = field(default_factory=list)
    graveyard: list[CardInstance] = field(default_factory=list)
    exile: list[CardInstance] = field(default_factory=list)

    creatures: list[CardInstance] = field(default_factory=list)
    catalysts: list[CardInstance] = field(default_factory=list)
    third_layer: list[CardInstance] = field(default_factory=list)
    pending: list[CardInstance] = field(default_factory=list)

    def change_life(self, life_change: int):
        self.life += life_change
    def set_life(self, life: int):
        self.life = life
    def change_mana(self, element: str, amount: int):
        self.mana[element] += amount
    def clear_mana(self):
        for e in self.mana:
            self.mana[e] = 0
