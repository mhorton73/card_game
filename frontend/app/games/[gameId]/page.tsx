

import GameClient from "@/components/GameClient"


type Props = {
  params: {
    gameId: string
  }
}

export default function GamePage({ params }: Props) {

  return (
    <GameClient gameId={params.gameId} />
  )
}