
import { Card } from "@/lib/types"

type Props = {
  card: Card
}

export default function CardComponent({ card }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-xl font-bold mb-1">{card.name}</h2>

      <p className="text-sm text-gray-600 mb-1">
        Type: {card.card_types.join(", ")}
        {card.subtypes &&<> - {card.subtypes.join(", ")}</>}
      </p>

      <p className="text-sm text-gray-600 mb-1">
        Set: {card.card_set.name}
      </p>

      {card.cost && <p className="text-sm">Cost: {card.cost}</p>}
      {card.attack !== null && card.health !== null && (
        <p className="text-sm">
          {card.attack}/{card.health}
        </p>
      )}

      {card.effect && <p className="text-sm mt-2">{card.effect}</p>}
      {card.flavour_text && (
        <p className="text-xs text-gray-500 italic mt-1">{card.flavour_text}</p>
      )}
    </div>
  )
}