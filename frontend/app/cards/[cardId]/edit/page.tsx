
import CardForm from "@/components/CardForm"
import Link from "next/link";
import { getSets, getCard } from"@/lib/api"

export default async function EditCardPage({
  params,
  searchParams,
}: {
  params: Promise<{ cardId: string }>
  searchParams: Promise<{ returnTo?: string }>
}) {

  const { cardId } = await params
  const { returnTo } = await searchParams

  const sets = await getSets()
  const card = await getCard(Number(cardId))

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Update Card</h1>

      <Link href={returnTo ?? "/cards"} className="text-blue-600 hover:underline">
        Return to card gallery
      </Link>

      <CardForm
        sets={sets.card_sets}
        initialData={card}
        cardId={Number(cardId)}
        method="PATCH"
        successMessage="Card updated!"
      />
    </main>
  )
}