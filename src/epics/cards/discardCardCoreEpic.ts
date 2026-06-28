import { ofType, StateObservable } from 'redux-observable'
import { of, concat, EMPTY, Observable } from 'rxjs'
import { withLatestFrom, mergeMap, delay, takeUntil } from 'rxjs/operators'
import {
  CLEAR_CARD,
  DISCARD_CARD_CORE,
  ADD_DISCARDED_TAG,
  DRAW_CARD,
  NEXT_ROUND,
  REMOVE_CARD,
  SWITCH_DISCARD_MODE,
  SWITCH_LOCK,
  MOVE_CARD_TO_TOP,
  AI_PLAY_CARD,
  ABORT_ALL,
} from '@/constants/ActionTypes'
import {
  aiExtraDelay,
  noAiExtraDelay,
  shouldUseAi,
} from '@/constants/devSettings'
import { aiDelay, cardTransitionDuration } from '@/constants/visuals'
import { recordCardLeavingHand } from '@/draft/store'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import {
  clearDrawDiscardMode,
  consumeDrawDiscard,
} from '@/utils/drawDiscardMode'
import getPan from '@/utils/sound/getPan'
import { play } from '@/utils/sound/Sound'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(DISCARD_CARD_CORE),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const { index, position, owner } = action
      const card = state.cards.list[index]
      const drawDiscard = state.game.discardMode ? consumeDrawDiscard() : null
      const discardModeFinished =
        drawDiscard !== null && drawDiscard.remaining <= 0
      if (discardModeFinished) {
        clearDrawDiscardMode()
      }
      if (card !== null) {
        recordCardLeavingHand(owner, card.n)
      }
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
          type: ADD_DISCARDED_TAG,
          index,
        }),
        of<RootActionType>({
          type: MOVE_CARD_TO_TOP,
          index,
        }).pipe(delay(0)),
        of<RootActionType>({
          type: REMOVE_CARD,
          index,
          position,
          owner,
        }),
        state.game.discardMode
          ? concat(
              discardModeFinished
                ? of<RootActionType>({
                    type: SWITCH_DISCARD_MODE,
                    on: false,
                  })
                : EMPTY,
              drawDiscard?.drawAfterDiscard
                ? of<RootActionType>({
                    type: DRAW_CARD,
                  }).pipe(delay(0))
                : EMPTY,
              !discardModeFinished &&
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
              discardModeFinished && !drawDiscard?.playagain
                ? concat(
                    of<RootActionType>({
                      type: SWITCH_LOCK,
                      on: true,
                    }),
                    of<RootActionType>({
                      type: NEXT_ROUND,
                    }).pipe(delay(cardTransitionDuration)),
                  )
                : EMPTY,
            )
          : concat(
              of<RootActionType>({
                type: SWITCH_LOCK,
                on: true, // will switch back in `NEXT_ROUND`
              }),
              of<RootActionType>({
                type: NEXT_ROUND,
              }).pipe(delay(cardTransitionDuration)),
            ),
      ).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
