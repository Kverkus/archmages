import React, { useContext, useEffect, useRef, useState } from 'react'
import { draftLossLimit, draftWinTarget } from '@/draft/core'
import { useDraftState } from '@/draft/useDraftState'
import { I18nContext } from '@/i18n/I18nContext'
import { useAppSelector } from '@/utils/hooks/useAppDispatch'
import styles from './DraftOverlay.module.scss'

const DraftOverlay = () => {
  const draft = useDraftState()
  const _ = useContext(I18nContext)
  const draftPick = useAppSelector((state) => state.screen.draftPick)
  const draftBetween = useAppSelector((state) => state.screen.draftBetween)
  const draftSaveNotice = useAppSelector(
    (state) => state.screen.draftSaveNotice,
  )
  const [showSavedToast, setShowSavedToast] = useState(false)
  const draftWindowOpen = draftPick || draftBetween
  const previousDraftWindowOpenRef = useRef(draftWindowOpen)

  useEffect(() => {
    const wasOpen = previousDraftWindowOpenRef.current
    previousDraftWindowOpenRef.current = draftWindowOpen

    if (
      wasOpen &&
      !draftWindowOpen &&
      !draftSaveNotice &&
      (draft.mode === 'draftPick' || draft.mode === 'draftBetween')
    ) {
      const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
        setShowSavedToast(true)
      }, 0)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [draft.mode, draftSaveNotice, draftWindowOpen])

  useEffect(() => {
    if (!showSavedToast) {
      return
    }

    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setShowSavedToast(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [showSavedToast])

  const hud =
    draft.mode === 'draftBattle' ? (
      <div className={styles.hud}>
        <div className={styles.hudtitle}>{_.i18n('Draft')}</div>
        <div>
          {_.i18n('Wins')}: {draft.wins} / {draftWinTarget}
        </div>
        <div>
          {_.i18n('Losses')}: {draft.losses} / {draftLossLimit}
        </div>
        <div>
          {_.i18n('Player deck')}: {draft.drawPile.length},{' '}
          {_.i18n('Discard pile')}: {draft.discardPile.length}
        </div>
        <div>
          {_.i18n('Opponent deck')}: {draft.opponentDrawPile.length},{' '}
          {_.i18n('Discard pile')}: {draft.opponentDiscardPile.length}
        </div>
      </div>
    ) : null

  return (
    <>
      {hud}
      {showSavedToast && (
        <div className={styles.savedtoast}>
          {_.i18n('Draft progress saved')}
        </div>
      )}
    </>
  )
}

export default DraftOverlay
