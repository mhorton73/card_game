
import { 
    addCounter,
    addToStack,
    changeLife,
    changeMana,
    clearMana,
    coinFlip,
    drawCards, 
    drawFromBottom, 
    moveCard, 
    peekTopN, 
    putOnBottom, 
    putOnTop, 
    removeCounter, 
    removeFromStack,
    setLife,
    tapCard,
    untapCard
} from "./api"
import {CardInstanceOut, CardContext, ZoneName} from "./types"

export type GameActions = {
  moveCardToYourZone: (cardContext: CardContext, destination: ZoneName) => Promise<void>
  moveCardToOppZone: (cardContext: CardContext, destination: ZoneName) => Promise<void>
  drawCards: (playerId: string, number: number) => Promise<void>
  putOnTop: (cardContext: CardContext) => Promise<void>
  putOnBottom: (cardContext: CardContext) => Promise<void>
  drawFromBottom: (playerId: string) => Promise<void>
  peekTopN: (playerId: string, n: number) => Promise<CardInstanceOut[]>
  coinFlip: () => Promise<boolean>
  addToStack: (playerId: string, cardContext: CardContext) => Promise<void>
  removeFromStack: (stackId: string) => Promise<void>
  tapCard: (cardContext: CardContext) => Promise<void>
  untapCard: (cardContext: CardContext) => Promise<void>
  addCounter: (cardContext: CardContext, counterType: string) => Promise<void>
  removeCounter: (cardContext: CardContext, counterType: string) => Promise<void>
  changeLife: (playerId: string, amount: number) => Promise<void>
  setLife: (playerId: string, life: number) => Promise<void>
  changeMana: (playerId: string, element: string, amount: number) => Promise<void>
  clearMana: (playerId: string) => Promise<void>
}

// Creates handlers for game actions to be attached to cards

export function createGameActions(gameId: string): GameActions {
    return {
        moveCardToYourZone: (cardContext, destination) => moveCard(gameId, {
            instance_id: cardContext.instance_id,
            source: cardContext.zone,
            source_owner_id: cardContext.owner_id,
            destination: destination,
            destination_owner_id: cardContext.owner_id
        }),
        moveCardToOppZone: (cardContext, destination) => moveCard(gameId, {
            instance_id: cardContext.instance_id,
            source: cardContext.zone,
            source_owner_id: cardContext.owner_id,
            destination: destination,
            destination_owner_id: cardContext.opponent_id
        }),
        drawCards: (playerId, number) => drawCards(gameId, {
            player_id: playerId, 
            number
        }),
        putOnTop: (cardContext) => putOnTop(gameId, {
            instance_id: cardContext.instance_id,
            source: cardContext.zone,
            source_owner_id: cardContext.owner_id
        }),
        putOnBottom: (cardContext) => putOnBottom(gameId, {
            instance_id: cardContext.instance_id,
            source: cardContext.zone,
            source_owner_id: cardContext.owner_id
        }),
        drawFromBottom: (playerId) => drawFromBottom(gameId, {player_id: playerId}),
        peekTopN: (playerId, n) => peekTopN(gameId, {
            player_id: playerId, 
            n
        }),
        coinFlip: () => coinFlip(gameId),
        addToStack: (playerId, cardContext) => addToStack(gameId, {
            player_id: playerId,
            source: cardContext.zone,
            source_owner_id: cardContext.owner_id,
            instance_id: cardContext.instance_id
        }),
        removeFromStack: (stackId) => removeFromStack(gameId, {stack_id: stackId}),
        tapCard: (cardContext) => tapCard(gameId, {
            instance_id: cardContext.instance_id,
            source: cardContext.zone,
            source_owner_id: cardContext.owner_id
        }),
        untapCard: (cardContext) => untapCard(gameId, {
            instance_id: cardContext.instance_id,
            source: cardContext.zone,
            source_owner_id: cardContext.owner_id
        }),
        addCounter: (cardContext, counterType) => addCounter(gameId, {
            instance_id: cardContext.instance_id,
            source: cardContext.zone,
            source_owner_id: cardContext.owner_id,
            counter_type: counterType
        }),
        removeCounter: (cardContext, counterType) => removeCounter(gameId, {
            instance_id: cardContext.instance_id,
            source: cardContext.zone,
            source_owner_id: cardContext.owner_id,
            counter_type: counterType
        }),
        changeLife: (playerId, amount) => changeLife(gameId, {
            player_id: playerId,
            amount
        }),
        setLife: (playerId, life) => setLife(gameId, {
            player_id: playerId,
            life
        }),
        changeMana: (playerId, element, amount) => changeMana(gameId, {
            player_id: playerId,
            element,
            amount
        }),
        clearMana: (playerId) => clearMana(gameId, {player_id: playerId})
    }
}


// Legacy types for manual request input at the GameCard level

// export type GameActions = {
//   moveCard: (req: MoveCardRequest) => Promise<void>
//   drawCards: (req: DrawCardsRequest) => Promise<void>
//   putOnTop: (req: BasicCardActionRequest) => Promise<void>
//   putOnBottom: (req: BasicCardActionRequest) => Promise<void>
//   DrawFromBottom: (req: DrawFromBottomRequest) => Promise<void>
//   peekTopN: (req: PeekTopNRequest) => Promise<CardInstanceOut[]>
//   coinFlip: () => Promise<boolean>
//   addToStack: (req: AddToStackRequest) => Promise<void>
//   removeFromStack: (req: RemoveFromStackRequest) => Promise<void>
//   tapCard: (req: BasicCardActionRequest) => Promise<void>
//   untapCard: (req: BasicCardActionRequest) => Promise<void>
//   addCounter: (req: CardCountersRequest) => Promise<void>
//   removeCounter: (req: CardCountersRequest) => Promise<void>
//   changeLife: (req: ChangeLifeRequest) => Promise<void>
//   setLife: (req: SetLifeRequest) => Promise<void>
//   changeMana: (req: ChangeManaRequest) => Promise<void>
//   clearMana: (req: PlayerActionRequest) => Promise<void>
// }

// export function createGameActions(gameId: string): GameActions {
//     return {
//         moveCard: (req) => moveCard(gameId, req),
//         drawCards: (req) => drawCards(gameId, req),
//         putOnTop: (req) => putOnTop(gameId, req),
//         putOnBottom: (req) => putOnBottom(gameId, req),
//         DrawFromBottom: (req) => drawFromBottom(gameId, req),
//         peekTopN: (req) => peekTopN(gameId, req),
//         coinFlip: () => coinFlip(gameId),
//         addToStack: (req) => addToStack(gameId, req),
//         removeFromStack: (req) => removeFromStack(gameId, req),
//         tapCard: (req) => tapCard(gameId, req),
//         untapCard: (req) => untapCard(gameId, req),
//         addCounter: (req) => addCounter(gameId, req),
//         removeCounter: (req) => removeCounter(gameId, req),
//         changeLife: (req) => changeLife(gameId, req),
//         setLife: (req) => setLife(gameId, req),
//         changeMana: (req) => changeMana(gameId, req),
//         clearMana: (req) => clearMana(gameId, req)
//     }
// }