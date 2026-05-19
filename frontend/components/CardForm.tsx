
"use client";
import { useState, FormEvent } from "react"
import { CardSet } from "@/lib/types"

type Props = {
  sets: CardSet[]
  successMessage?: string;
}

export default function CardForm({ sets, successMessage }: Props) {
  const [name, setName] = useState("")
  const [cost, setCost] = useState("")
  const [element, setElement] = useState<string[]>([])
  const [cardTypes, setCardTypes] = useState<string[]>([])
  const [subtypes, setSubtypes] = useState<string[]>([])
  const [effect, setEffect] = useState("")
  const [flavourText, setFlavourText] = useState("")
  const [attack, setAttack] = useState<number | "">("")
  const [health, setHealth] = useState<number | "">("")
  const [setId, setSetId] = useState<number>(sets[0]?.id ?? 0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:8000/card-editor/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          cost: cost || null,
          element,
          card_types: cardTypes,
          subtypes,
          effect: effect || null,
          flavour_text: flavourText || null,
          attack: attack === "" ? null : attack,
          health: health === "" ? null : health,
          set_id: setId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create card")
      }

      setName("")
      setCost("")
      setElement([])
      setCardTypes([])
      setSubtypes([])
      setEffect("")
      setFlavourText("")
      setAttack("")
      setHealth("")
      setSetId(sets[0]?.id ?? 0)

      if (successMessage) alert(successMessage);
    } catch (err: any) {
      setError(err.message || "Error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-4">
      <div>
        <label className="block font-semibold">Name</label>
        <input
          className="border rounded w-full p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Cost</label>
        <input
          className="border rounded w-full p-2"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold">Set</label>
        <select
          className="border rounded w-full p-2"
          value={setId}
          onChange={(e) => setSetId(Number(e.target.value))}
        >
          {sets.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold">Types (comma separated)</label>
        <input
          className="border rounded w-full p-2"
          value={cardTypes.join(", ")}
          onChange={(e) =>
            setCardTypes(e.target.value.split(",").map((t) => t.trim()))
          }
        />
      </div>

      <div>
        <label className="block font-semibold">Subtypes (comma separated)</label>
        <input
          className="border rounded w-full p-2"
          value={subtypes.join(", ")}
          onChange={(e) =>
            setSubtypes(e.target.value.split(",").map((s) => s.trim()))
          }
        />
      </div>

      <div>
        <label className="block font-semibold">Elements (comma separated)</label>
        <input
          className="border rounded w-full p-2"
          value={element.join(", ")}
          onChange={(e) =>
            setElement(e.target.value.split(",").map((s) => s.trim()))
          }
        />
      </div>

      <div>
        <label className="block font-semibold">Effect</label>
        <textarea
          className="border rounded w-full p-2"
          value={effect}
          onChange={(e) => setEffect(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold">Flavour Text</label>
        <textarea
          className="border rounded w-full p-2"
          value={flavourText}
          onChange={(e) => setFlavourText(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Attack</label>
          <input
            type="number"
            className="border rounded w-full p-2"
            value={attack}
            onChange={(e) => setAttack(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block font-semibold">Health</label>
          <input
            type="number"
            className="border rounded w-full p-2"
            value={health}
            onChange={(e) => setHealth(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Card"}
      </button>
    </form>
  )
}