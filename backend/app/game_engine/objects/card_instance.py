
from dataclasses import dataclass, field

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

    counters: dict[str, int] = field(default_factory=dict)
    def num_counters(self, counter_type: str):
        return self.counters.get(counter_type, 0)
    def add_counter(self, counter_type: str):
        self.counters[counter_type] = self.counters.get(counter_type, 0) + 1
    def remove_counter(self, counter_type: str):
        current = self.counters.get(counter_type, 0)
        if current <= 1:
            self.counters.pop(counter_type, None)
        else:
            self.counters[counter_type] = current - 1