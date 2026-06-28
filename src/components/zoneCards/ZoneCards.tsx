import React, { useContext } from 'react'
import { GameSizeContext } from '@/utils/contexts/GameSizeContext'
import { useAppSelector } from '@/utils/hooks/useAppDispatch'
import CardPosStyle from './CardPosStyle'
import ZoneCardsInner from './ZoneCardsInner'

/**
 * Lower Zone for Cards
 */
const ZoneCards = () => {
  const cardsInHand = useAppSelector((state) => state.settings.cardsInHand)
  const cardTotal = useAppSelector((state) => state.cards.total)

  const size = useContext(GameSizeContext)
  const winHeight = size.height
  const winWidth = size.width
  const layoutCardsInHand = Math.max(
    cardsInHand,
    cardTotal.player - 1,
    cardTotal.opponent - 1,
  )

  return (
    <>
      <CardPosStyle
        cardsInHand={layoutCardsInHand}
        winHeight={winHeight}
        winWidth={winWidth}
      />
      <ZoneCardsInner />
    </>
  )
}

export default ZoneCards
