import React, { useContext } from 'react'
import {
  INIT,
  SCREEN_DRAFT_BETWEEN,
  SCREEN_DRAFT_SAVE_NOTICE,
} from '@/constants/ActionTypes'
import { draftLossLimit, draftWinTarget } from '@/draft/core'
import { startNextDraftBattle } from '@/draft/store'
import { useDraftState } from '@/draft/useDraftState'
import { I18nContext } from '@/i18n/I18nContext'
import { useAppDispatch } from '@/utils/hooks/useAppDispatch'
import draftStyles from '../draft/DraftOverlay.module.scss'
import Window from './Window'
import styles from './Window.module.scss'

const DraftBetween = () => {
  const draft = useDraftState()
  const _ = useContext(I18nContext)
  const dispatch = useAppDispatch()

  const showSavedNotice = () => {
    dispatch({
      type: SCREEN_DRAFT_SAVE_NOTICE,
      show: true,
    })
  }

  const nextMatch = () => {
    startNextDraftBattle()
    dispatch({
      type: SCREEN_DRAFT_BETWEEN,
      show: false,
    })
    dispatch({
      type: INIT,
      fromScreenEnd: true,
    })
  }

  if (draft.mode !== 'draftBetween') {
    return null
  }

  return (
    <Window screenActionType={SCREEN_DRAFT_BETWEEN} onCancel={showSavedNotice}>
      <h3 className="text-center">{_.i18n('Between Matches')}</h3>
      {draft.lastBattleResult !== null && (
        <p className={styles.description}>
          {_.i18n(
            draft.lastBattleResult === 'win'
              ? 'Last match: win'
              : draft.lastBattleResult === 'lose'
                ? 'Last match: loss'
                : 'Last match: tie',
          )}
        </p>
      )}
      <div className={draftStyles.record}>
        {_.i18n('Wins')}: {draft.wins} / {draftWinTarget}
      </div>
      <div className={draftStyles.record}>
        {_.i18n('Losses')}: {draft.losses} / {draftLossLimit}
      </div>
      <div className={styles.buttonwrapper}>
        <button onClick={nextMatch}>{_.i18n('Next match')}</button>
      </div>
    </Window>
  )
}

export default DraftBetween
