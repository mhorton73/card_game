import { 
    CardInstanceOut, CardInstancePackage, 
    GameStateOut, 
    PlayerStateOut, ProcessedGameState, ProcessedPlayerState, 
    ProcessedStackItem, StackItemOut,
} from "@/lib/types"
import { getCachedCard } from "./cardCache";

export async function processCardInstance(instance: CardInstanceOut): Promise<CardInstancePackage> {

  const card = await getCachedCard(instance.card_id)

  const cardPackage: CardInstancePackage = {instance, card}

  return cardPackage
}

async function processZone(
  zone: CardInstanceOut[]
): Promise<CardInstancePackage[]> {
  return Promise.all(zone.map(processCardInstance))
}

export async function processPlayerState(player: PlayerStateOut): Promise<ProcessedPlayerState> {
    
  const [
  hand,
  graveyard,
  exile,
  creatures,
  catalysts,
  thirdLayer,
  pending,
  ] = await Promise.all([
    processZone(player.hand),
    processZone(player.graveyard),
    processZone(player.exile),
    processZone(player.creatures),
    processZone(player.catalysts),
    processZone(player.third_layer),
    processZone(player.pending),
  ])

  return {
    player_id: player.player_id,
    name: player.name,
    life: player.life,
    mana: player.mana,

    deck_count: player.deck_count,
    hand_count: player.hand_count,

    hand,
    graveyard,
    exile,

    creatures,
    catalysts,
    third_layer: thirdLayer,
    pending,
  }
}

export async function processStackItem(stackItem: StackItemOut): Promise<ProcessedStackItem> {
    
  const card = await processCardInstance(stackItem.card)

  return {
    card,
    controller_id: stackItem.controller_id
  }
}

export async function processGameState(gameState: GameStateOut): Promise<ProcessedGameState> {

  const [players, stack] = await Promise.all([
    Promise.all(gameState.players.map(processPlayerState)),
    Promise.all(gameState.stack.map(processStackItem)),
  ])

    return{
        game_id: gameState.game_id,
        players,
        game_started: gameState.game_started,
        turn_number: gameState.turn_number,
        stack,
    }
}