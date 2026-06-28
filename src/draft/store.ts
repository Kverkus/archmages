import { ownerType2 } from '@/types/state'
import { randomWithProbs } from '@/utils/randomWithProbs'
import {
  DraftBattleResultType,
  DraftStateType,
  chooseDraftCard,
  createRandomDraftDeck,
  drawFromDraftDeck,
  initialDraftState,
  recordDraftBattleResult,
  recordDraftCardLeavingHand,
  startDraftBattle,
  startDraftRun,
} from './core'

let draftState: DraftStateType = initialDraftState

const listeners = new Set<() => void>()

const emit = () => {
  listeners.forEach((listener) => {
    listener()
  })
}

const setDraftState = (nextState: DraftStateType) => {
  draftState = nextState
  emit()
}

export const subscribeDraftState = (listener: () => void): (() => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export const getDraftState = (): DraftStateType => draftState

export const showModeMenu = () => {
  setDraftState({
    ...initialDraftState,
    mode: 'menu',
  })
}

export const startClassicMode = () => {
  setDraftState({
    ...initialDraftState,
    mode: 'classic',
  })
}

export const startDraftMode = () => {
  setDraftState(startDraftRun(randomWithProbs))
}

export const restoreDraftState = (state: DraftStateType) => {
  setDraftState(state)
}

const startBattleWithNewOpponentDeck = (state: DraftStateType) =>
  startDraftBattle(state, Math.random, createRandomDraftDeck(randomWithProbs))

export const chooseDraftOfferCard = (n: number) => {
  const nextState = chooseDraftCard(draftState, n, randomWithProbs)
  setDraftState(
    nextState.mode === 'draftBattle'
      ? startBattleWithNewOpponentDeck(nextState)
      : nextState,
  )
}

export const drawCardForOwner = (owner: ownerType2): number => {
  if (draftState.mode !== 'draftBattle') {
    return randomWithProbs()
  }

  const result = drawFromDraftDeck(draftState, owner)
  setDraftState(result.state)
  return result.n ?? randomWithProbs()
}

export const recordCardLeavingHand = (owner: ownerType2, n: number) => {
  if (draftState.mode === 'draftBattle') {
    setDraftState(recordDraftCardLeavingHand(draftState, n, owner))
  }
}

export const recordBattleResult = (result: DraftBattleResultType) => {
  setDraftState(recordDraftBattleResult(draftState, result))
}

export const advanceAfterBattleScreen = (): 'between' | 'complete' | null => {
  if (draftState.mode === 'draftBetween') {
    return 'between'
  }

  if (draftState.mode === 'draftComplete') {
    return 'complete'
  }

  return null
}

export const startNextDraftBattle = () => {
  if (draftState.mode === 'draftBetween') {
    setDraftState(startBattleWithNewOpponentDeck(draftState))
  }
}

export const isDraftBattleMode = (): boolean =>
  draftState.mode === 'draftBattle'
