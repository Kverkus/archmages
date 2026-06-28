import { ofType, StateObservable } from 'redux-observable'
import { concat, EMPTY, Observable, of } from 'rxjs'
import { mergeMap, delay, withLatestFrom, takeUntil } from 'rxjs/operators'
import {
  CLEAR_CARD,
  USE_CARD_CORE,
  EXEC_CARD,
  MOVE_CARD_TO_CENTER,
  SWITCH_LOCK,
  REMOVE_CARD,
  SWITCH_DISCARD_MODE,
  MOVE_CARD_TO_TOP,
  DRAW_CARD,
  NEXT_ROUND,
  AI_PLAY_CARD,
  ABORT_ALL,
} from '@/constants/ActionTypes'
import {
  aiExtraDelay,
  noAiExtraDelay,
  shouldUseAi,
} from '@/constants/devSettings'
import {
  aiDelay,
  cardNextStepDelay,
  cardTransitionDuration,
  drawCardPre,
} from '@/constants/visuals'
import cards from '@/data/cards'
import { recordCardLeavingHand } from '@/draft/store'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import { startDrawDiscardMode } from '@/utils/drawDiscardMode'
import getPan from '@/utils/sound/getPan'
import { play } from '@/utils/sound/Sound'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(USE_CARD_CORE),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const { n, index, position, owner } = action
      const special = cards[n].special
      const drawDiscard = special?.drawDiscard
        ? {
            draw: special.drawDiscard.draw,
            discard: special.drawDiscard.discard,
            drawAfterDiscard: special.drawDiscard.drawAfterDiscard ?? false,
            playagain: special.drawDiscard.playagain ?? false,
          }
        : special?.drawDiscardPlayagain
          ? {
              draw: 1,
              discard: 1,
              drawAfterDiscard: true,
              playagain: true,
            }
          : null
      if (drawDiscard) {
        startDrawDiscardMode({
          remaining: drawDiscard.discard,
          drawAfterDiscard: drawDiscard.drawAfterDiscard,
          playagain: drawDiscard.playagain,
        })
      }
      const drawCardStepDelay =
        drawCardPre + cardTransitionDuration + cardNextStepDelay
      recordCardLeavingHand(owner, n)
      play(
        'deal',
        null,
        state.sound.stereo ? getPan(state.cards.total[owner], position) : 0,
      )
      return concat(
        state.game.isNewTurn
          ? of<RootActionType>({
              type: CLEAR_CARD,
            })
          : EMPTY,
        of<RootActionType>({
          type: EXEC_CARD,
          n,
          owner,
        }),
        of<RootActionType>({
          type: MOVE_CARD_TO_CENTER,
          index,
        }),
        of<RootActionType>({
          type: REMOVE_CARD,
          index,
          position,
          owner,
        }),
        of<RootActionType>({
          type: SWITCH_LOCK,
          on: true,
        }),
        drawDiscard
          ? concat(
              of<RootActionType>({
                type: SWITCH_DISCARD_MODE,
                on: true,
              }),
              ...Array.from({ length: drawDiscard.draw }, (_item, i) =>
                of<RootActionType>({
                  type: DRAW_CARD,
                }).pipe(delay(i === 0 ? 0 : drawCardStepDelay)),
              ),
              of<RootActionType>({
                type: MOVE_CARD_TO_TOP,
                index,
              }).pipe(delay(cardTransitionDuration + cardNextStepDelay)),
              of<RootActionType>({
                type: SWITCH_LOCK,
                on: false,
              }),
              owner === 'opponent' &&
                shouldUseAi &&
                state.multiplayer.gameNumber === -1
                ? of<RootActionType>({
                    type: AI_PLAY_CARD,
                  }).pipe(
                    delay(
                      cardTransitionDuration +
                        aiDelay +
                        (noAiExtraDelay ? 0 : aiExtraDelay),
                    ),
                  )
                : EMPTY,
            )
          : concat(
              of<RootActionType>({
                type: MOVE_CARD_TO_TOP,
                index,
              }).pipe(delay(cardTransitionDuration + cardNextStepDelay)),
              special?.playagain
                ? concat(
                    of<RootActionType>({
                      type: DRAW_CARD,
                    }).pipe(delay(0)),
                    of<RootActionType>({
                      type: SWITCH_LOCK,
                      on: false,
                    }),
                  )
                : of<RootActionType>({
                    type: NEXT_ROUND,
                  }).pipe(delay(cardTransitionDuration)),
            ),
      ).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
