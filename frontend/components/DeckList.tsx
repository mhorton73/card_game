
import { DeckListElement } from "@/lib/types"

type Props = {
  cards: DeckListElement[]
  deckSize: number
  onAdd?: (cardId: number) => void
  onRemove?: (cardId: number) => void
}

export default function DeckList({ cards, deckSize, onAdd, onRemove }: Props) {
  if (deckSize === 0) {
    return (
      <div className="text-gray-500 text-sm border rounded p-4">
        No cards in this deck yet.
      </div>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 font-semibold text-sm">
        Cards: ({deckSize})
      </div>

      <ul className="divide-y">
        {cards.map((card) => (
          <li
            key={card.card_id}
            className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
          >
            {/* Card info */}
            <p className="font-medium truncate min-w-0">{card.card_name}</p>


            {/* Quantity + controls */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-sm font-semibold">
                x{card.quantity}
              </span>

              {onRemove && (
                <button
                  onClick={() => onRemove(card.card_id)}
                  className="w-8 h-8 flex items-center justify-center text-sm border rounded hover:bg-red-50 text-red-600 leading-none"
                >
                  −
                </button>
              )}

              {onAdd && (
                <button
                  onClick={() => onAdd(card.card_id)}
                  className="w-8 h-8 flex items-center justify-center text-sm border rounded hover:bg-green-50 text-green-600 leading-none"
                >
                   +
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}