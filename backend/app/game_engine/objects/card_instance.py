
from dataclasses import dataclass

@dataclass
class CardInstance:
    instance_id: str
    owner_id: str
    card_id: int

    tapped: bool = False
    def tap(self):
        self.tapped = True
    def untap(self):
        self.tapped = False

    counters: dict[str, int] = None
    def add_counter(self, counter_type: str):
        self.counters[counter_type] = self.counters.get(counter_type, 0) + 1
    def remove_counter(self, counter_type: str):
        current = self.counters.get(counter_type, 0)
        self.counters[counter_type] = max(0, current - 1)