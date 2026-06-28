import { produce } from 'immer'
import {
  INIT_STATUS,
  RESTORE_DRAFT_MATCH,
  UPDATE_STATUS_MAIN,
} from '@/constants/ActionTypes'
import { defaultStatus } from '@/constants/defaultSettings'
import { RootActionType } from '@/types/actionObj'
import { StatusType } from '@/types/state'

export default produce((draft: StatusType, action: RootActionType) => {
  switch (action.type) {
    case INIT_STATUS: {
      return {
        player: { ...action.payload },
        opponent: { ...action.payload },
      }
    }
    case RESTORE_DRAFT_MATCH: {
      return action.payload.status
    }
    case UPDATE_STATUS_MAIN: {
      for (const upd of action.payload) {
        const { isPlayer, statusProp } = upd
        if ('to' in upd) {
          draft[isPlayer ? 'player' : 'opponent'][statusProp] = upd.to
        } else {
          draft[isPlayer ? 'player' : 'opponent'][statusProp] += upd.diff
        }
      }
      break
    }
  }
}, defaultStatus)
