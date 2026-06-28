import cards from '@/data/cards'
import { ownerType2 } from '@/types/state'

export const draftDeckSize = 30
export const draftOfferSize = 3
export const draftWinTarget = 10
export const draftLossLimit = 3

export type DraftModeType =
  | 'menu'
  | 'classic'
  | 'draftPick'
  | 'draftBattle'
  | 'draftBetween'
  | 'draftComplete'

export type DraftBattleResultType = 'win' | 'lose' | 'tie'

export type DraftStateType = {
  mode: DraftModeType
  deck: number[]
  offer: number[]
  wins: number
  losses: number
  drawPile: number[]
  discardPile: number[]
  opponentDeck: number[]
  opponentDrawPile: number[]
  opponentDiscardPile: number[]
  lastBattleResult: DraftBattleResultType | null
}

export const initialDraftState: DraftStateType = {
  mode: 'menu',
  deck: [],
  offer: [],
  wins: 0,
  losses: 0,
  drawPile: [],
  discardPile: [],
  opponentDeck: [],
  opponentDrawPile: [],
  opponentDiscardPile: [],
  lastBattleResult: null,
}

export const shuffle = <T>(
  arr: readonly T[],
  random: () => number = Math.random,
): T[] => {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export const createDraftOffer = (
  randomCard: () => number,
  cardCount = cards.length,
): number[] => {
  const offer: number[] = []
  const seen = new Set<number>()
  const maxAttempts = cardCount * 4
  let attempts = 0

  while (offer.length < draftOfferSize && attempts < maxAttempts) {
    attempts++
    const n = randomCard()
    if (Number.isInteger(n) && n >= 0 && n < cardCount && !seen.has(n)) {
      offer.push(n)
      seen.add(n)
    }
  }

  for (let n = 0; offer.length < draftOfferSize && n < cardCount; n++) {
    if (!seen.has(n)) {
      offer.push(n)
      seen.add(n)
    }
  }

  return offer
}

export const createRandomDraftDeck = (randomCard: () => number): number[] =>
  Array.from({ length: draftDeckSize }, randomCard)

export const startDraftRun = (randomCard: () => number): DraftStateType => ({
  ...initialDraftState,
  mode: 'draftPick',
  offer: createDraftOffer(randomCard),
})

export const chooseDraftCard = (
  state: DraftStateType,
  n: number,
  randomCard: () => number,
): DraftStateType => {
  if (state.mode !== 'draftPick' || !state.offer.includes(n)) {
    return state
  }

  const deck = [...state.deck, n]
  if (deck.length >= draftDeckSize) {
    return {
      ...state,
      mode: 'draftBattle',
      deck,
      offer: [],
      lastBattleResult: null,
    }
  }

  return {
    ...state,
    deck,
    offer: createDraftOffer(randomCard),
  }
}

export const startDraftBattle = (
  state: DraftStateType,
  random: () => number = Math.random,
  opponentDeck: number[] = state.opponentDeck,
): DraftStateType => ({
  ...state,
  mode: 'draftBattle',
  drawPile: shuffle(state.deck, random),
  discardPile: [],
  opponentDeck,
  opponentDrawPile: shuffle(opponentDeck, random),
  opponentDiscardPile: [],
  lastBattleResult: null,
})

const updateOwnerPiles = (
  state: DraftStateType,
  owner: ownerType2,
  drawPile: number[],
  discardPile: number[],
): DraftStateType =>
  owner === 'player'
    ? {
        ...state,
        drawPile,
        discardPile,
      }
    : {
        ...state,
        opponentDrawPile: drawPile,
        opponentDiscardPile: discardPile,
      }

export const drawFromDraftDeck = (
  state: DraftStateType,
  ownerOrRandom: ownerType2 | (() => number) = 'player',
  random: () => number = Math.random,
): { state: DraftStateType; n: number | null } => {
  if (state.mode !== 'draftBattle') {
    return { state, n: null }
  }

  const owner = typeof ownerOrRandom === 'function' ? 'player' : ownerOrRandom
  const randomFn = typeof ownerOrRandom === 'function' ? ownerOrRandom : random
  const deck = owner === 'player' ? state.deck : state.opponentDeck
  let drawPile = owner === 'player' ? state.drawPile : state.opponentDrawPile
  let discardPile =
    owner === 'player' ? state.discardPile : state.opponentDiscardPile

  if (drawPile.length === 0) {
    if (discardPile.length > 0) {
      drawPile = shuffle(discardPile, randomFn)
      discardPile = []
    } else {
      drawPile = shuffle(deck, randomFn)
    }
  }

  const [n, ...rest] = drawPile
  return {
    state: updateOwnerPiles(state, owner, rest, discardPile),
    n: n ?? null,
  }
}

export const recordDraftCardLeavingHand = (
  state: DraftStateType,
  n: number,
  owner: ownerType2 = 'player',
): DraftStateType => {
  if (state.mode !== 'draftBattle') {
    return state
  }

  return owner === 'player'
    ? {
        ...state,
        discardPile: [...state.discardPile, n],
      }
    : {
        ...state,
        opponentDiscardPile: [...state.opponentDiscardPile, n],
      }
}

export const recordDraftBattleResult = (
  state: DraftStateType,
  result: DraftBattleResultType,
): DraftStateType => {
  if (state.mode !== 'draftBattle' || state.lastBattleResult !== null) {
    return state
  }

  const wins = state.wins + (result === 'win' ? 1 : 0)
  const losses = state.losses + (result === 'lose' ? 1 : 0)
  const mode =
    wins >= draftWinTarget || losses >= draftLossLimit
      ? 'draftComplete'
      : 'draftBetween'

  return {
    ...state,
    mode,
    wins,
    losses,
    lastBattleResult: result,
  }
}
