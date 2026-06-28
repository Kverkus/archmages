import React, { useContext } from 'react'
import {
  INIT,
  SCREEN_DRAFT_COMPLETE,
  SCREEN_DRAFT_PICK,
  SCREEN_MODE_MENU,
} from '@/constants/ActionTypes'
import { draftLossLimit, draftWinTarget } from '@/draft/core'
import { startClassicMode, startDraftMode } from '@/draft/store'
import { useDraftState } from '@/draft/useDraftState'
import { I18nContext } from '@/i18n/I18nContext'
import { useAppDispatch } from '@/utils/hooks/useAppDispatch'
import draftStyles from '../draft/DraftOverlay.module.scss'
import Window from './Window'
import styles from './Window.module.scss'

const DraftComplete = () => {
  const draft = useDraftState()
  const _ = useContext(I18nContext)
  const dispatch = useAppDispatch()

  const startNewDraft = () => {
    startDraftMode()
    dispatch({
      type: SCREEN_DRAFT_PICK,
      show: true,
    })
  }

  const startClassic = () => {
    startClassicMode()
    dispatch({
      type: SCREEN_DRAFT_COMPLETE,
      show: false,
    })
    dispatch({
      type: INIT,
      fromScreenEnd: true,
    })
  }

  const openModeMenu = () => {
    dispatch({
      type: SCREEN_MODE_MENU,
      show: true,
    })
  }

  if (draft.mode !== 'draftComplete') {
    return null
  }

  return (
    <Window screenActionType={SCREEN_DRAFT_COMPLETE}>
      <h3 className="text-center">
        {_.i18n(
          draft.wins >= draftWinTarget ? 'Draft Victory' : 'Draft Defeat',
        )}
      </h3>
      <div className={draftStyles.record}>
        {_.i18n('Wins')}: {draft.wins} / {draftWinTarget}
      </div>
      <div className={draftStyles.record}>
        {_.i18n('Losses')}: {draft.losses} / {draftLossLimit}
      </div>
      <div className={styles.buttonwrapper}>
        <button onClick={startNewDraft}>{_.i18n('New Draft')}</button>
        <button onClick={startClassic}>{_.i18n('Classic')}</button>
        <button onClick={openModeMenu}>{_.i18n('Modes')}</button>
      </div>
    </Window>
  )
}

export default DraftComplete
