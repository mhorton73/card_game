
import DeckEditor from "@/components/DeckEditor"

import { getCards, getDeck} from "@/lib/api"
import Link from "next/link"

type Props = {
  params: Promise<{
    deckId: string
  }>
  searchParams: Promise<{
    returnTo?: string
  }>
}

export default async function DeckPage({ params, searchParams }: Props) {

    const { deckId } = await params
    const { returnTo } = await searchParams

    try {
        const cardData = await getCards()
        const deckDetail = await getDeck(Number(deckId))
        
        return (
          <>
            <Link href={returnTo ?? "/decks"} className="text-blue-600 hover:underline">
               Return to decks
            </Link>
            <DeckEditor
            initialDeck={deckDetail}
            allCards={cardData.cards}
            />
          </>  
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