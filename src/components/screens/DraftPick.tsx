import cl from 'clarr'
import React, { CSSProperties, useContext, useMemo, useState } from 'react'
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

const choiceCardWidth = 'clamp(8.75rem, min(13vw, 28dvh), 14rem)'
const floatingPreviewWidth = 'clamp(9rem, min(12vw, 30dvh), 13.5rem)'

const choiceCardStyle = {
  '--draft-choice-card-width': choiceCardWidth,
  '--cardwidth': 'var(--draft-choice-card-width)',
} as CSSProperties

const floatingPreviewStyle = {
  '--cardwidth': floatingPreviewWidth,
} as CSSProperties

const cardTypeClassNames = [
  cardStyles.red,
  cardStyles.blue,
  cardStyles.green,
] as const

const deckStatClassNames = [
  draftStyles.deckstatred,
  draftStyles.deckstatblue,
  draftStyles.deckstatgreen,
] as const

const deckRowClassNames = [
  draftStyles.deckrowred,
  draftStyles.deckrowblue,
  draftStyles.deckrowgreen,
] as const

const deckRowCostIconClassNames = [
  draftStyles.deckrowcostbrick,
  draftStyles.deckrowcostgem,
  draftStyles.deckrowcostrecruit,
] as const

const cardTypeNames = ['bricks', 'gems', 'recruits'] as const
const cardTypes = [0, 1, 2] as const

type CardPreviewPropType = {
  n: number
  onClick: () => void
}

const CardPreview = ({ n, onClick }: CardPreviewPropType) => {
  const type = dataCards[n].type

  return (
    <button
      className={draftStyles.choice}
      style={choiceCardStyle}
      onClick={onClick}
    >
      <div className={cl(draftStyles.cardframe, cardTypeClassNames[type])}>
        <CardFront n={n} />
      </div>
    </button>
  )
}

type DraftDeckStackType = {
  n: number
  count: number
  firstPickIndex: number
}

type DraftDeckCategoryType = {
  type: (typeof cardTypes)[number]
  count: number
  averageCost: number | null
  stacks: DraftDeckStackType[]
}

type DraftDeckListEntryType = DraftDeckStackType & {
  type: (typeof cardTypes)[number]
  cost: number
}

type FloatingPreviewType = {
  n: number
  left: number
  top: number
}

const getResponsiveWidth = (
  rootFontSize: number,
  minRem: number,
  viewportWidthRatio: number,
  viewportHeightRatio: number,
  maxRem: number,
) =>
  Math.min(
    Math.max(
      rootFontSize * minRem,
      Math.min(
        window.innerWidth * viewportWidthRatio,
        window.innerHeight * viewportHeightRatio,
      ),
    ),
    rootFontSize * maxRem,
  )

const formatAverageCost = (cost: number | null) => {
  if (cost === null) {
    return '-'
  }

  return Number.isInteger(cost) ? cost.toString() : cost.toFixed(1)
}

const getDeckCategories = (deck: number[]): DraftDeckCategoryType[] =>
  cardTypes.map((type) => {
    const stacks = new Map<number, DraftDeckStackType>()
    let totalCost = 0
    let count = 0

    deck.forEach((n, i) => {
      const card = dataCards[n]

      if (card.type !== type) {
        return
      }

      count += 1
      totalCost += card.cost

      const stack = stacks.get(n)
      if (stack === undefined) {
        stacks.set(n, { n, count: 1, firstPickIndex: i })
      } else {
        stack.count += 1
      }
    })

    return {
      type,
      count,
      averageCost: count === 0 ? null : totalCost / count,
      stacks: [...stacks.values()],
    }
  })

const getDeckListEntries = (
  categories: DraftDeckCategoryType[],
): DraftDeckListEntryType[] =>
  categories
    .flatMap(({ type, stacks }) =>
      stacks.map((stack) => ({
        ...stack,
        type,
        cost: dataCards[stack.n].cost,
      })),
    )
    .sort(
      (a, b) =>
        a.type - b.type ||
        a.cost - b.cost ||
        a.firstPickIndex - b.firstPickIndex,
    )

const getFloatingPreviewPosition = (
  el: HTMLElement,
): Omit<FloatingPreviewType, 'n'> => {
  const rect = el.getBoundingClientRect()
  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  )
  const previewWidth = getResponsiveWidth(rootFontSize, 9, 0.12, 0.3, 13.5)
  const previewHeight = (previewWidth * 252) / 188
  const padding = 8

  return {
    left: Math.max(padding, rect.left - previewWidth - 12),
    top: Math.min(
      Math.max(rect.top + rect.height / 2, previewHeight / 2 + padding),
      window.innerHeight - previewHeight / 2 - padding,
    ),
  }
}

const DraftPick = () => {
  const draft = useDraftState()
  const _ = useContext(I18nContext)
  const dispatch = useAppDispatch()
  const [floatingPreview, setFloatingPreview] =
    useState<FloatingPreviewType | null>(null)
  const deckCategories = useMemo(
    () => getDeckCategories(draft.deck),
    [draft.deck],
  )
  const deckListEntries = useMemo(
    () => getDeckListEntries(deckCategories),
    [deckCategories],
  )

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

  const showCardPreview = (n: number, el: HTMLElement) => {
    setFloatingPreview({
      n,
      ...getFloatingPreviewPosition(el),
    })
  }

  const hideCardPreview = () => {
    setFloatingPreview(null)
  }

  if (draft.mode !== 'draftPick') {
    return null
  }

  const floatingPreviewType =
    floatingPreview === null ? null : dataCards[floatingPreview.n].type

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
      <div className={draftStyles.draftpicklayout}>
        <div className={draftStyles.draftpickmain}>
          <p className={draftStyles.subtitle}>{_.i18n('Choose a card')}</p>
          <div className={draftStyles.offer}>
            {draft.offer.map((n) => (
              <CardPreview key={n} n={n} onClick={() => chooseCard(n)} />
            ))}
          </div>
        </div>
        {draft.deck.length > 0 && (
          <aside className={draftStyles.deckside}>
            <div className={draftStyles.deckstats}>
              {deckCategories.map(({ type, count, averageCost }) => (
                <div
                  className={cl(draftStyles.deckstat, deckStatClassNames[type])}
                  key={type}
                >
                  <span className={draftStyles.deckstatname}>
                    {_.i18n(cardTypeNames[type])}
                  </span>
                  <span className={draftStyles.deckstatcount}>{count}</span>
                  <span className={draftStyles.deckaverage}>
                    {formatAverageCost(averageCost)}
                  </span>
                </div>
              ))}
            </div>
            <div className={draftStyles.decklist} role="list">
              {deckListEntries.map(({ n, count, type, cost }) => (
                <div
                  className={cl(draftStyles.deckrow, deckRowClassNames[type])}
                  key={n}
                  onMouseEnter={(e) => showCardPreview(n, e.currentTarget)}
                  onMouseLeave={hideCardPreview}
                  onMouseMove={(e) => showCardPreview(n, e.currentTarget)}
                  onPointerCancel={hideCardPreview}
                  onPointerDown={(e) => {
                    if (e.pointerType !== 'mouse') {
                      showCardPreview(n, e.currentTarget)
                    }
                  }}
                  onPointerEnter={(e) => showCardPreview(n, e.currentTarget)}
                  onPointerLeave={hideCardPreview}
                  onPointerMove={(e) => showCardPreview(n, e.currentTarget)}
                  onPointerUp={(e) => {
                    if (e.pointerType !== 'mouse') {
                      hideCardPreview()
                    }
                  }}
                  onTouchCancel={hideCardPreview}
                  onTouchEnd={hideCardPreview}
                  onTouchStart={(e) => showCardPreview(n, e.currentTarget)}
                  role="listitem"
                >
                  <span className={draftStyles.deckrowcount}>
                    {count > 1 ? count : ''}
                  </span>
                  <span className={draftStyles.deckrowname}>
                    {_.cards(n, 'name')}
                  </span>
                  <span className={draftStyles.deckrowcost}>
                    <span
                      className={cl(
                        draftStyles.deckrowcosticon,
                        deckRowCostIconClassNames[type],
                      )}
                    ></span>
                    <span className={draftStyles.deckrowcostnumber}>
                      {cost}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
      {floatingPreview !== null && floatingPreviewType !== null && (
        <div
          className={cl(
            draftStyles.deckfloatingpreview,
            cardTypeClassNames[floatingPreviewType],
          )}
          style={
            {
              ...floatingPreviewStyle,
              left: floatingPreview.left,
              top: floatingPreview.top,
            } as CSSProperties
          }
        >
          <CardFront n={floatingPreview.n} />
        </div>
      )}
    </Window>
  )
}

export default DraftPick
