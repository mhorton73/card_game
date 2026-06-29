import { Card } from "@/lib/types"
import { getCard } from "@/lib/api"

const cache = new Map<number, Card>()
const pending = new Map<number, Promise<Card>>()

export async function getCachedCard(cardId: number): Promise<Card> {

  // Check if cached
  if (cache.has(cardId)) {
    return cache.get(cardId)!
  }

  // Check if already being fetched
  if (pending.has(cardId)) {
    return pending.get(cardId)!
  }

  // Fetch if not already
  const promise = getCard(cardId).then((card) => {
    cache.set(cardId,card)
    return card
  }).finally(() => {
    pending.delete(cardId)
  })

  // Store the promise
  pending.set(cardId, promise)
  return promise
}