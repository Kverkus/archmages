import { produce } from 'immer'
import {
  RESTORE_DRAFT_MATCH,
  UPDATE_SETTINGS_MAIN,
} from '@/constants/ActionTypes'
import { defaultSettingState } from '@/constants/defaultSettings'
import { RootActionType } from '@/types/actionObj'
import { SettingsStateType } from '@/types/state'

export default produce((draft: SettingsStateType, action: RootActionType) => {
  switch (action.type) {
    case UPDATE_SETTINGS_MAIN: {
      return { ...draft, ...action.payload }
    }
    case RESTORE_DRAFT_MATCH: {
      return action.payload.settings
    }
  }
}, defaultSettingState)
