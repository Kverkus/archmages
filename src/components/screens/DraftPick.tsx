import cl from 'clarr'
import React, { CSSProperties, useContext } from 'react'
import {
  INIT,
  SCREEN_DRAFT_PICK,
  SCREEN_DRAFT_SAVE_NOTICE,
} from '@/constants/ActionTypes'
import dataCards from '@/data/cards'
import { draftDeckSize } from '@/draft/core'
import { chooseDraftOfferCard, getDraftState } from '@/draft/store'
import { useDraftState } from '@/draft/useDraftState'
import { I18nContext } from '@/i18n/I18nContext'
import { useAppDispatch } from '@/utils/hooks/useAppDispatch'
import draftStyles from '../draft/DraftOverlay.module.scss'
import cardStyles from '../zoneCards/Card.module.scss'
import CardFront from '../zoneCards/CardFront'
import Window from './Window'

const cardStyle = {
  '--cardwidth': '10rem',
} as CSSProperties

type CardPreviewPropType = {
  n: number
  onClick: () => void
}

const CardPreview = ({ n, onClick }: CardPreviewPropType) => {
  const type = dataCards[n].type

  return (
    <button className={draftStyles.choice} onClick={onClick}>
      <div
        className={cl(
          draftStyles.cardframe,
          cardStyles[['red', 'blue', 'green'][type]],
        )}
        style={cardStyle}
      >
        <CardFront n={n} />
      </div>
    </button>
  )
}

const DraftPick = () => {
  const draft = useDraftState()
  const _ = useContext(I18nContext)
  const dispatch = useAppDispatch()

  const showSavedNotice = () => {
    if (
      getDraftState().mode === 'draftPick' &&
      getDraftState().deck.length > 0
    ) {
      dispatch({
        type: SCREEN_DRAFT_SAVE_NOTICE,
        show: true,
      })
    }
  }

  const chooseCard = (n: number) => {
    chooseDraftOfferCard(n)
    if (getDraftState().mode === 'draftBattle') {
      dispatch({
        type: SCREEN_DRAFT_PICK,
        show: false,
      })
      dispatch({
        type: INIT,
        fromScreenEnd: true,
      })
    }
  }

  if (draft.mode !== 'draftPick') {
    return null
  }

  return (
    <Window screenActionType={SCREEN_DRAFT_PICK} onCancel={showSavedNotice}>
      <div className={draftStyles.drafttop}>
        <div>
          <h3>{_.i18n('Draft')}</h3>
          <div className={draftStyles.draftcounter}>
            {draft.deck.length + 1} / {draftDeckSize}
          </div>
        </div>
      </div>
      <p className={draftStyles.subtitle}>{_.i18n('Choose a card')}</p>
      <div className={draftStyles.offer}>
        {draft.offer.map((n) => (
          <CardPreview key={n} n={n} onClick={() => chooseCard(n)} />
        ))}
      </div>
      {draft.deck.length > 0 && (
        <div className={draftStyles.decklist}>
          {draft.deck.map((n, i) => (
            <span className={draftStyles.deckitem} key={`${n}-${i}`}>
              {i + 1}. {_.cards(n, 'name')}
            </span>
          ))}
        </div>
      )}
    </Window>
  )
}

export default DraftPick
