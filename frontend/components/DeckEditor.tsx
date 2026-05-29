
"use client";

import { useState, useEffect } from "react";
import CardGrid from "@/components/CardGrid"
import DeckList from "@/components/DeckList"
import { addDeckCardCopy, removeDeckCardCopy } from "@/lib/api"
import { Card, DeckDetail } from "@/lib/types";

type Props = {
  initialDeck: DeckDetail
  allCards: Card[]
}

export default function DeckEditor({ initialDeck, allCards }: Props) {

    const [deck, setDeck] = useState<DeckDetail>(initialDeck);

    const handleAdd = async (cardId: number) => {
        try {
            await addDeckCardCopy(deck.deck_id, cardId)

            setDeck((prev) => {
            const existingCard = prev.cards.find(
                (c) => c.card_id === cardId
            )

            // card already exists in deck
            if (existingCard) {
                return {
                ...prev,
                deck_size: prev.deck_size + 1,
                cards: prev.cards.map((c) =>
                    c.card_id === cardId
                    ? { ...c, quantity: c.quantity + 1 }
                    : c
                ),
                }
            }

            // card not yet in deck
            const cardData = allCards.find((c) => c.id === cardId)

            if (!cardData) return prev

            return {
                ...prev,
                deck_size: prev.deck_size + 1,
                cards: [
                ...prev.cards,
                {
                    card_id: cardId,
                    card_name: cardData.name,
                    quantity: 1,
                },
                ],
            }
            })
        } catch (err) {
            console.error(err)
        }
    }

    const handleRemove = async (cardId: number) => {
        try {
            await removeDeckCardCopy(deck.deck_id, cardId)

            setDeck((prev) => {
            const existingCard = prev.cards.find(
                (c) => c.card_id === cardId
            )

            if (!existingCard) return prev

            // remove entirely if quantity becomes 0
            if (existingCard.quantity === 1) {
                return {
                ...prev,
                deck_size: prev.deck_size - 1,
                cards: prev.cards.filter(
                    (c) => c.card_id !== cardId
                ),
                }
            }

            // otherwise decrement quantity
            return {
                ...prev,
                deck_size: prev.deck_size - 1,
                cards: prev.cards.map((c) =>
                c.card_id === cardId
                    ? { ...c, quantity: c.quantity - 1 }
                    : c
                ),
            }
            })
        } catch (err) {
            console.error(err)
        }
    }

    return(
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-6">{deck.deck_name}</h1>
        
            <div className="flex gap-6">
                {/* Left sidebar: Deck list */}
                <div className="flex-[1] max-w-[20%]">
                <DeckList 
                    cards={deck.cards} 
                    deckSize={deck.deck_size} 
                    onAdd={handleAdd} 
                    onRemove={handleRemove} 
                />
                </div>

                {/* Right main area: Card grid */}
                <div className="flex-[4]">
                <CardGrid 
                    cards={allCards}
                    renderActions={(card) => (
                        <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => handleRemove(card.id)}
                            className="border rounded px-2 py-1"
                        >
                            -
                        </button>
                        
                        <button
                            onClick={() => handleAdd(card.id)}
                            className="border rounded px-2 py-1"
                        >
                            +
                        </button>
                        </div>
                    )} 
                />
                </div>
            </div>
        </main>
    )
}