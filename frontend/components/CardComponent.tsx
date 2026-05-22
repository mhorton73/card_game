
import { Card } from "@/lib/types"

type Props = {
  card: Card
}
// w-[250px] for cards for the intended display size, idk ill fix it later
export default function CardComponent({ card }: Props) {
  return (
    <div className="relative border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-200 aspect-[5/7] w-full min-w-0"> 
      <h2 className="text-xl font-bold mb-1">{card.name}</h2>

      {card.cost && <p className="text-sm">Cost: {card.cost}</p>}

      <p className="text-sm text-gray-600 mb-1">
        Type: {card.card_types.join(", ")}
        {card.subtypes[0] &&<> - {card.subtypes.join(", ")}</>}
      </p>

      <p className="text-sm text-gray-600 mb-1 bottom-1 left-3 absolute">
        Set: {card.card_set.name}
      </p>

      
      {card.attack !== null && card.health !== null && (
        <p className="text-base bottom-2 right-4 absolute">
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