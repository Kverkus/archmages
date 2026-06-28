import { ofType, StateObservable } from 'redux-observable'
import { concat, Observable, of } from 'rxjs'
import { withLatestFrom, mergeMap } from 'rxjs/operators'
import {
  ABORT_ALL,
  CLOSE_SCREEN_END_INIT,
  INIT,
  INIT_FROM_QUEUE,
  SCREEN_DRAFT_BETWEEN,
  SCREEN_DRAFT_COMPLETE,
  SCREEN_END,
} from '@/constants/ActionTypes'
import { advanceAfterBattleScreen } from '@/draft/store'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(CLOSE_SCREEN_END_INIT),
    withLatestFrom(state$),
    mergeMap(([_action, state]) => {
      const draftAdvance = advanceAfterBattleScreen()
      if (draftAdvance !== null) {
        return concat(
          of<RootActionType>({
            type: SCREEN_END,
            payload: { type: null },
          }),
          of<RootActionType>({
            type:
              draftAdvance === 'between'
                ? SCREEN_DRAFT_BETWEEN
                : SCREEN_DRAFT_COMPLETE,
            show: true,
          }),
          of<RootActionType>({
            type: ABORT_ALL,
          }),
        )
      }

      const isGuestInGame =
        state.multiplayer.gameNumber > 0 &&
        state.multiplayer.status === 'connected_by_id'
      return concat(
        of<RootActionType>({
          type: SCREEN_END,
          payload: { type: null },
        }),
        isGuestInGame
          ? of<RootActionType>({
              type: INIT_FROM_QUEUE,
            })
          : of<RootActionType>({
              type: INIT,
              fromScreenEnd: true,
            }),
      )
    }),
  )
