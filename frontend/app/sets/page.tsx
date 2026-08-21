import Link from "next/link"
import { getSets} from "@/lib/api"
import CreateFormModal from "@/components/CreateFormModal"


export default async function DecksPage() {
    const data = await getSets()

    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">Decks</h1>

        <Link href="/" className="block text-blue-600 hover:underline">
          Homepage
        </Link>

        <Link href={`/cards`} className="block text-blue-600 hover:underline">
          All cards
        </Link>

        {/* Create set*/}
        <CreateFormModal type="set"/>

        <div className="mt-6 grid max-w-[1050px] gap-4">
          {data.card_sets.map((card_set) => (
            <Link
              key={card_set.id}
              href={`/sets/${card_set.id}`}
              className="
                p-2 
                w-[200px] 
                border
                rounded 
                flex 
                justify-between 
                items-center
                bg-[var(--surface)]
                hover:bg-[var(--surface-light)]
                hover:border-[var(--accent)]
                hover:text-[var(--text-muted)]"
            >
              {card_set.name} 
            </Link>
          ))}
        </div>
      </main>
    )
}