import React, { useContext, useState } from 'react'
import {
  ABORT_ALL,
  AI_PLAY_CARD,
  INIT,
  RESTORE_DRAFT_MATCH,
  SCREEN_DRAFT_BETWEEN,
  SCREEN_DRAFT_COMPLETE,
  SCREEN_DRAFT_PICK,
  SCREEN_END,
  SCREEN_MODE_MENU,
  SET_MULTI_GAME_NUMBER,
} from '@/constants/ActionTypes'
import { draftLossLimit, draftWinTarget, DraftStateType } from '@/draft/core'
import {
  DraftProgressSaveType,
  hasDraftProgressSave,
  isActiveDraftProgress,
  loadDraftProgress,
} from '@/draft/persistence'
import {
  getDraftState,
  restoreDraftState,
  startClassicMode,
  startDraftMode,
} from '@/draft/store'
import { useDraftState } from '@/draft/useDraftState'
import { I18nContext } from '@/i18n/I18nContext'
import { restoreDrawDiscardMode } from '@/utils/drawDiscardMode'
import { useAppDispatch } from '@/utils/hooks/useAppDispatch'
import Window from './Window'
import styles from './Window.module.scss'

const normalizeSavedDraft = (draft: DraftStateType): DraftStateType => {
  if (draft.mode !== 'draftBattle' || draft.lastBattleResult === null) {
    return draft
  }

  return {
    ...draft,
    mode:
      draft.wins >= draftWinTarget || draft.losses >= draftLossLimit
        ? 'draftComplete'
        : 'draftBetween',
  }
}

const ModeMenu = () => {
  const _ = useContext(I18nContext)
  const dispatch = useAppDispatch()
  const draft = useDraftState()
  const [showDraftResume, setShowDraftResume] = useState(false)

  const closeMenu = () => {
    dispatch({
      type: SCREEN_MODE_MENU,
      show: false,
    })
  }

  const startClassic = () => {
    startClassicMode()
    closeMenu()
    dispatch({
      type: INIT,
      fromScreenEnd: true,
    })
  }

  const openDraftProgress = (
    draftState: DraftStateType,
    save: DraftProgressSaveType | null,
  ) => {
    const restoredDraft = normalizeSavedDraft(draftState)
    restoreDraftState(restoredDraft)

    if (restoredDraft.mode === 'draftPick') {
      dispatch({
        type: SCREEN_DRAFT_PICK,
        show: true,
      })
      return
    }

    if (restoredDraft.mode === 'draftBetween') {
      dispatch({
        type: SCREEN_DRAFT_BETWEEN,
        show: true,
      })
      return
    }

    if (restoredDraft.mode === 'draftComplete') {
      dispatch({
        type: SCREEN_DRAFT_COMPLETE,
        show: true,
      })
      return
    }

    if (restoredDraft.mode === 'draftBattle' && save?.match) {
      closeMenu()
      dispatch({
        type: SCREEN_END,
        payload: { type: null },
      })
      dispatch({
        type: ABORT_ALL,
      })
      dispatch({
        type: RESTORE_DRAFT_MATCH,
        payload: save.match,
      })
      restoreDrawDiscardMode(save.match.drawDiscardMode)
      dispatch({
        type: SET_MULTI_GAME_NUMBER,
        n: -1,
      })

      if (
        !save.match.game.playersTurn &&
        !save.match.game.discardMode &&
        save.match.game.locked.every((locked) => !locked)
      ) {
        dispatch({
          type: AI_PLAY_CARD,
        })
      }
      return
    }

    if (restoredDraft.mode === 'draftBattle' && save === null) {
      closeMenu()
      return
    }

    startDraftMode()
    dispatch({
      type: SCREEN_DRAFT_PICK,
      show: true,
    })
  }

  const startNewDraft = () => {
    startDraftMode()
    dispatch({
      type: SCREEN_DRAFT_PICK,
      show: true,
    })
  }

  const startDraft = () => {
    if (hasDraftProgressSave() || isActiveDraftProgress(draft)) {
      setShowDraftResume(true)
      return
    }

    startNewDraft()
  }

  const continueDraft = () => {
    const save = loadDraftProgress()
    openDraftProgress(save?.draft ?? getDraftState(), save)
  }

  return (
    <Window screenActionType={SCREEN_MODE_MENU}>
      <h3 className="text-center">{_.i18n('Game mode')}</h3>
      {showDraftResume ? (
        <>
          <p className={styles.description}>
            {_.i18n('You already have a draft run in progress.')}
          </p>
          <div className={styles.buttonwrapper}>
            <button onClick={continueDraft}>{_.i18n('Continue')}</button>
            <button onClick={startNewDraft}>{_.i18n('New Draft')}</button>
          </div>
        </>
      ) : (
        <>
          <p className={styles.description}>{_.i18n('Choose a game mode')}</p>
          <div className={styles.buttonwrapper}>
            <button onClick={startClassic}>{_.i18n('Classic')}</button>
            <button onClick={startDraft}>{_.i18n('Draft (beta)')}</button>
          </div>
        </>
      )}
    </Window>
  )
}

export default ModeMenu
