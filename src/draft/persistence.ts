import {
  CardStateType,
  GameStateType,
  RootStateType,
  SettingsStateType,
  StatusType,
} from '@/types/state'
import {
  DrawDiscardModeType,
  getDrawDiscardMode,
} from '@/utils/drawDiscardMode'
import { DraftStateType } from './core'

const draftSaveKey = 'arcomage-hd-draft-progress'
const draftSaveVersion = 1

export type DraftMatchSaveType = {
  status: StatusType
  cards: CardStateType
  game: GameStateType
  settings: SettingsStateType
  drawDiscardMode: DrawDiscardModeType
}

export type DraftProgressSaveType = {
  version: typeof draftSaveVersion
  draft: DraftStateType
  match: DraftMatchSaveType | null
}

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T

const hasLocalStorage = (): boolean =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

const isNumberArray = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'number')

const isOptionalNumberArray = (value: unknown): value is number[] | undefined =>
  value === undefined || isNumberArray(value)

const normalizeDraftState = (draft: DraftStateType): DraftStateType => ({
  ...draft,
  opponentDeck: draft.opponentDeck ?? [],
  opponentDrawPile: draft.opponentDrawPile ?? [],
  opponentDiscardPile: draft.opponentDiscardPile ?? [],
})

const isDrawDiscardMode = (value: unknown): value is DrawDiscardModeType => {
  if (value === null || typeof value !== 'object') {
    return false
  }

  const mode = value as Partial<DrawDiscardModeType>
  return (
    typeof mode.remaining === 'number' &&
    typeof mode.drawAfterDiscard === 'boolean' &&
    typeof mode.playagain === 'boolean'
  )
}

export const isActiveDraftProgress = (draft: DraftStateType): boolean =>
  draft.mode === 'draftPick' ||
  draft.mode === 'draftBattle' ||
  draft.mode === 'draftBetween' ||
  draft.mode === 'draftComplete'

const isDraftProgressSave = (
  value: unknown,
): value is DraftProgressSaveType => {
  if (value === null || typeof value !== 'object') {
    return false
  }

  const save = value as Partial<DraftProgressSaveType>
  const draft = save.draft as Partial<DraftStateType> | undefined
  if (save.version !== draftSaveVersion || draft === undefined) {
    return false
  }

  const match = save.match as Partial<DraftMatchSaveType> | null | undefined
  const validMatch =
    match === null ||
    (match !== undefined && isDrawDiscardMode(match.drawDiscardMode))

  return (
    validMatch &&
    typeof draft.mode === 'string' &&
    isNumberArray(draft.deck) &&
    isNumberArray(draft.offer) &&
    typeof draft.wins === 'number' &&
    typeof draft.losses === 'number' &&
    isNumberArray(draft.drawPile) &&
    isNumberArray(draft.discardPile) &&
    isOptionalNumberArray(draft.opponentDeck) &&
    isOptionalNumberArray(draft.opponentDrawPile) &&
    isOptionalNumberArray(draft.opponentDiscardPile) &&
    (draft.lastBattleResult === null ||
      draft.lastBattleResult === 'win' ||
      draft.lastBattleResult === 'lose' ||
      draft.lastBattleResult === 'tie')
  )
}

export const createDraftMatchSave = (
  state: RootStateType,
): DraftMatchSaveType => ({
  status: clone(state.status),
  cards: clone(state.cards),
  game: clone(state.game),
  settings: clone(state.settings),
  drawDiscardMode: getDrawDiscardMode(),
})

export const saveDraftProgress = (
  draft: DraftStateType,
  match: DraftMatchSaveType | null,
): void => {
  if (!hasLocalStorage() || !isActiveDraftProgress(draft)) {
    return
  }

  const save: DraftProgressSaveType = {
    version: draftSaveVersion,
    draft: clone(draft),
    match: match === null ? null : clone(match),
  }

  window.localStorage.setItem(draftSaveKey, JSON.stringify(save))
}

export const loadDraftProgress = (): DraftProgressSaveType | null => {
  if (!hasLocalStorage()) {
    return null
  }

  const raw = window.localStorage.getItem(draftSaveKey)
  if (raw === null) {
    return null
  }

  try {
    const parsed: unknown = JSON.parse(raw)
    if (!isDraftProgressSave(parsed)) {
      return null
    }

    return {
      ...parsed,
      draft: normalizeDraftState(parsed.draft),
    }
  } catch {
    return null
  }
}

export const hasDraftProgressSave = (): boolean => loadDraftProgress() !== null

export const clearDraftProgress = (): void => {
  if (hasLocalStorage()) {
    window.localStorage.removeItem(draftSaveKey)
  }
}
