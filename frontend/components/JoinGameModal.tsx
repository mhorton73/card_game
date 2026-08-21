"use client"

import { useState } from "react"
import { joinGame } from "@/lib/api"

type JoinGameModalProps = {
  gameId:string
  playerId:string
}

export default function JoinGameModal( {gameId, playerId}: JoinGameModalProps ) {

  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault()

    if (!name.trim()) {
      return;
    }

    setLoading(true)

    try {
      await joinGame(gameId, {
        player_id: playerId, 
        name:(name.trim())
    })

      setName("")
      setOpen(false)
    } catch (error) {
      console.error("Failed to join game:", error)
    } finally {
      setLoading(false)
    }
  }

  return (

    <>
      <button
        onClick={() => setOpen(true)}
        className="text-blue-600 hover:underline"
      >
        Join Game
      </button>

      {open && (
        // Transparent gray covering the screen
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          {/*The confirmation box*/}
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-bold">Join Game</h2>

            <form onSubmit={handleSubmit} className="mt-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Name
                </span>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded border border-gray-300 p-2"
                  autoFocus
                />
              </label>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                  setName("")
                  setOpen(false)
                  }}
                  className="rounded px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading || !name.trim()}
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Joining..." : "Join"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}