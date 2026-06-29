import { CardInstancePackage } from "@/lib/types"
import GameCard from "./GameCard"

type ZoneProps = {
  zoneName: string
  cards: CardInstancePackage[]
  flip?: boolean
}

export default function Zone({
  zoneName,
  cards,
  flip
}: ZoneProps) {
  return (
    <div className="border rounded-lg p-2 bg-gray-50">
      <h2 className="font-semibold mb-2">
        {zoneName} ({cards.length})
      </h2>

      <div className="flex flex-wrap gap-2">
        {cards.map((c) => (
          <div
            key={c.instance.instance_id}
            className={`w-32 ${flip ? "rotate-180" : ""}`}
          >
            <GameCard
              card={c.card}
              instance={c.instance}
            />
          </div>
        ))}
      </div>
    </div>
  )
}