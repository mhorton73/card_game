import Link from "next/link"
import { getDecks} from "@/lib/api"
import DeckPreview from "@/components/DeckPreview"
import DeckDeleteButton from "@/components/DeckDeleteButton"
import CreateFormModal from "@/components/CreateFormModal"


export default async function DecksPage() {
    const data = await getDecks()

    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">Decks</h1>

        <Link href="/" className="block text-blue-600 hover:underline">
          Homepage
        </Link>

        {/* Create deck*/}
        <CreateFormModal type="deck"/>

        <div className="mt-6 grid grid-cols-[repeat(auto-fit,200px)] max-w-[1050px] gap-4">
          {data.decks.map((deck) => (
            <div
              key={deck.id}
              className="p-2 w-[200px] rounded flex flex-col justify-between items-center"
            >
              {/* Consider removing deck preview if it goes unused in game lobby*/}
              <DeckPreview deck = {deck} />

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