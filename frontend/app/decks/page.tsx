import Link from "next/link"
import { getDecks } from "@/lib/api"
import DeckPreview from "@/components/DeckPreview"

export default async function DecksPage() {
    const data = await getDecks()
    return (
        <main className="p-8">
            <h1 className="text=3x1 font-bold mb-6">Decks</h1>

            {/* Create deck*/}
            <Link href="decks/new" className="text-blue-600 hover:underline">
                Create New Deck
            </Link>
             <div className="mt-6 grid gap-4 max-w-[600px]">
        {data.decks.map((deck) => (
          <div
            key={deck.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <DeckPreview deck = {deck}/>

            <div className="flex gap-3 text-sm">
              <Link
                href={`/decks/${deck.id}?returnTo=/decks`}
                className="text-blue-600 hover:underline"
              >
                View
              </Link>

              <Link
                href={`/decks/${deck.id}/edit?returnTo=/decks`}
                className="text-green-600 hover:underline"
              >
                Edit
              </Link>

            </div>
          </div>
        ))}
      </div>
        </main>
    )
}