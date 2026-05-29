
import DeckEditor from "@/components/DeckEditor"

import { getCards, getDeck} from "@/lib/api"

type Props = {
  params: Promise<{
    deckId: string
  }>
}

export default async function DeckPage({ params }: Props) {

    const { deckId } = await params

    try {
        const cardData = await getCards()
        const deckDetail = await getDeck(Number(deckId))
        
        return (
            <DeckEditor
            initialDeck={deckDetail}
            allCards={cardData.cards}
            />
        )
    } catch (error) {
        return (
            <main className="p-8">
            <h1 className="text-3xl font-bold mb-4">
                Failed to load deck page
            </h1>

            <p>Please try again later.</p>
            </main>
        )
    }
}