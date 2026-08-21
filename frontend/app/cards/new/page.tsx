
import CardForm from "@/components/CardForm"
import { getSets } from"@/lib/api"
import Link from "next/link"

type Props = {
  searchParams: Promise<{
    returnTo?: string
  }>
}


export default async function CreateCardPage({
  searchParams,
}: Props) {
  const sets = await getSets()
  const { returnTo } = await searchParams

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Create Card</h1>

      <Link href={returnTo ?? "/cards"} className="text-blue-600 hover:underline">
        Return to card gallery
      </Link>

      <p className="mt-4 max-w-2xl">
        Currently allowed types are Catalyst, Creature, Spell, Invocation, Surge, Site. 
      </p>
      <p className="max-w-2xl">
        Currently allowed subtypes are Dragon, Wolf, Golem, Resonant, Ghost.
      </p>
      <p className="max-w-2xl">
        Currently allowed elements are Fire, Water, Earth, Air. 
      </p>

      <CardForm 
        sets={sets.card_sets}
        method="POST"
        successMessage="Card created"
      />
    </main>
  )
}