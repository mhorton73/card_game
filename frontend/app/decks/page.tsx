import Link from "next/link"
import { getDecks} from "@/lib/api"
import DeckFormModal from "@/components/DeckFormModal"
import DeckPreview from "@/components/DeckPreview"
import DeckDeleteButton from "@/components/DeckDeleteButton"


export default async function DecksPage() {
    const data = await getDecks()

    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">Decks</h1>

        <Link href="/" className="block text-blue-600 hover:underline">
          Homepage
        </Link>

        {/* Create deck*/}
        <DeckFormModal/>

        <div className="mt-6 grid gap-4 max-w-[600px] mx-auto">
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

                <DeckDeleteButton deckId = {deck.id}/>
              </div>
            </div>
          ))}
        </div>
      </main>
    )
}