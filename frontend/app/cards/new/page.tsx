
import CardForm from "@/components/CardForm"
import { getSets } from"@/lib/api"
import Link from "next/link";

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

      <CardForm 
        sets={sets.card_sets}
        method="POST"
        successMessage="Card created"
      />
    </main>
  )
}