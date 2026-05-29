
import { Deck } from "@/lib/types"

type Props = {
  deck: Deck
}
// w-[250px] for cards for the intended display size, idk ill fix it later
export default function DeckPreview({ deck }: Props) {
  return (
    <div className="relative border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-200 aspect-[3/2] w-full min-w-0"> 
      <h2 className="text-xl font-bold mb-1">{deck.name}</h2>

      {<p className="text-sm">Cards: {deck.size}</p>}

    </div>
  )
}