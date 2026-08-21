
import { Deck } from "@/lib/types"

type Props = {
  deck: Deck
}

export default function DeckPreview({ deck }: Props) {
  return (
    <div className="
      relative 
      border 
      rounded-lg 
      p-4 
      shadow 
      hover:shadow-lg 
      transition-shadow 
      duration-200 
      aspect-[3/2] 
      w-[200px]
      min-w-0
      bg-[var(--surface)]"
    > 
      <h2 className="text-xl font-bold mb-1">{deck.name}</h2>

      {<p className="text-sm">Cards: {deck.size}</p>}

    </div>
  )
}