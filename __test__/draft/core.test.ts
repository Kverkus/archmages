import { describe, expect, it } from 'bun:test'
import {
  chooseDraftCard,
  createRandomDraftDeck,
  createDraftOffer,
  draftDeckSize,
  draftLossLimit,
  draftWinTarget,
  DraftStateType,
  drawFromDraftDeck,
  initialDraftState,
  recordDraftBattleResult,
  recordDraftCardLeavingHand,
  startDraftBattle,
  startDraftRun,
} from '@/draft/core'

describe('draft core', () => {
  it('creates unique three-card offers even when random repeats', () => {
    const seq = [4, 4, 4, 9, 9, 12]
    let i = 0
    const offer = createDraftOffer(() => seq[i++] ?? 0, 20)

    expect(offer).toHaveLength(3)
    expect(new Set(offer).size).toBe(3)
    expect(offer).toEqual([4, 9, 12])
  })

  it('builds a 30-card deck and enters battle mode', () => {
    let next = 0
    let state = startDraftRun(() => next++)

    for (let i = 0; i < draftDeckSize; i++) {
      state = chooseDraftCard(state, state.offer[0], () => next++)
    }

    expect(state.deck).toHaveLength(draftDeckSize)
    expect(state.mode).toBe('draftBattle')
  })

  it('creates a random 30-card opponent deck', () => {
    let next = 0
    const deck = createRandomDraftDeck(() => next++)

    expect(deck).toHaveLength(draftDeckSize)
    expect(deck[0]).toBe(0)
    expect(deck[draftDeckSize - 1]).toBe(draftDeckSize - 1)
  })

  it('draws from the deck and reshuffles discarded cards', () => {
    const state = startDraftBattle(
      {
        ...initialDraftState,
        mode: 'draftBattle',
        deck: [1, 2],
      },
      () => 0,
    )

    const first = drawFromDraftDeck(state, () => 0)
    expect(first.n).toBe(2)
    expect(first.state.drawPile).toEqual([1])

    const withDiscard = recordDraftCardLeavingHand(first.state, 2)
    const second = drawFromDraftDeck(withDiscard, () => 0)
    expect(second.n).toBe(1)

    const third = drawFromDraftDeck(second.state, () => 0)
    expect(third.n).toBe(2)
  })

  it('draws opponent cards from the opponent deck and discard pile', () => {
    const state = startDraftBattle(
      {
        ...initialDraftState,
        mode: 'draftBattle',
        deck: [1, 2],
      },
      () => 0,
      [10, 11],
    )

    const first = drawFromDraftDeck(state, 'opponent', () => 0)
    expect(first.n).toBe(11)
    expect(first.state.opponentDrawPile).toEqual([10])

    const withDiscard = recordDraftCardLeavingHand(first.state, 11, 'opponent')
    const second = drawFromDraftDeck(withDiscard, 'opponent', () => 0)
    expect(second.n).toBe(10)

    const third = drawFromDraftDeck(second.state, 'opponent', () => 0)
    expect(third.n).toBe(11)
  })

  it('starts each battle with the provided opponent deck', () => {
    const state = {
      ...initialDraftState,
      mode: 'draftBattle' as const,
      deck: [1, 2],
    }

    const first = startDraftBattle(state, () => 0, [10, 11])
    const second = startDraftBattle(
      {
        ...first,
        mode: 'draftBetween',
      },
      () => 0,
      [20, 21],
    )

    expect(first.opponentDeck).toEqual([10, 11])
    expect(second.opponentDeck).toEqual([20, 21])
    expect(second.opponentDiscardPile).toEqual([])
  })

  it('tracks run wins and losses', () => {
    const betweenState = recordDraftBattleResult(
      {
        ...initialDraftState,
        mode: 'draftBattle' as const,
      },
      'win',
    )
    expect(betweenState.mode).toBe('draftBetween')
    expect(betweenState.lastBattleResult).toBe('win')

    let state: DraftStateType = {
      ...initialDraftState,
      mode: 'draftBattle' as const,
    }

    for (let i = 0; i < draftWinTarget; i++) {
      state = recordDraftBattleResult(state, 'win')
      if (i < draftWinTarget - 1) {
        state = {
          ...state,
          mode: 'draftBattle',
          lastBattleResult: null,
        }
      }
    }
    expect(state.wins).toBe(draftWinTarget)
    expect(state.mode).toBe('draftComplete')

    state = {
      ...initialDraftState,
      mode: 'draftBattle',
    }

    for (let i = 0; i < draftLossLimit; i++) {
      state = recordDraftBattleResult(state, 'lose')
      if (i < draftLossLimit - 1) {
        state = {
          ...state,
          mode: 'draftBattle',
          lastBattleResult: null,
        }
      }
    }
    expect(state.losses).toBe(draftLossLimit)
    expect(state.mode).toBe('draftComplete')
  })
})
