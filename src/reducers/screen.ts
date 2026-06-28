import { produce } from 'immer'
import {
  SCREEN_END_MAIN,
  SCREEN_HELP,
  SCREEN_LANDSCAPE,
  SCREEN_DISCONNECT_NOTICE,
  SCREEN_DRAFT_BETWEEN,
  SCREEN_DRAFT_COMPLETE,
  SCREEN_DRAFT_PICK,
  SCREEN_DRAFT_SAVE_NOTICE,
  SCREEN_LANG_PREF,
  SCREEN_MODE_MENU,
  SCREEN_PREF,
  SCREEN_VOLUME_PREF,
} from '@/constants/ActionTypes'
import { RootActionType } from '@/types/actionObj'
import { ScreenStateType } from '@/types/state'

const defaultScreen: ScreenStateType = {
  pref: false,
  langPref: false,
  sgPref: false,
  help: false,
  modeMenu: true,
  draftPick: false,
  draftBetween: false,
  draftComplete: false,
  draftSaveNotice: false,
  landscape: false,
  disconnectNotice: false,
  end: { type: null },
}

const closeStandardScreens = (draft: ScreenStateType) => {
  draft.pref = false
  draft.langPref = false
  draft.sgPref = false
  draft.help = false
  draft.modeMenu = false
  draft.draftPick = false
  draft.draftBetween = false
  draft.draftComplete = false
  draft.draftSaveNotice = false
}

export default produce((draft: ScreenStateType, action: RootActionType) => {
  switch (action.type) {
    case SCREEN_PREF: {
      if (action.show) {
        closeStandardScreens(draft)
      }
      draft.pref = action.show
      break
    }
    case SCREEN_LANG_PREF: {
      if (action.show) {
        closeStandardScreens(draft)
      }
      draft.langPref = action.show
      break
    }
    case SCREEN_VOLUME_PREF: {
      if (action.show) {
        closeStandardScreens(draft)
      }
      draft.sgPref = action.show
      break
    }
    case SCREEN_HELP: {
      if (action.show) {
        closeStandardScreens(draft)
      }
      draft.help = action.show
      break
    }
    case SCREEN_MODE_MENU: {
      if (action.show) {
        closeStandardScreens(draft)
      }
      draft.modeMenu = action.show
      break
    }
    case SCREEN_DRAFT_PICK: {
      if (action.show) {
        closeStandardScreens(draft)
      }
      draft.draftPick = action.show
      break
    }
    case SCREEN_DRAFT_BETWEEN: {
      if (action.show) {
        closeStandardScreens(draft)
      }
      draft.draftBetween = action.show
      break
    }
    case SCREEN_DRAFT_COMPLETE: {
      if (action.show) {
        closeStandardScreens(draft)
      }
      draft.draftComplete = action.show
      break
    }
    case SCREEN_DRAFT_SAVE_NOTICE: {
      if (action.show) {
        closeStandardScreens(draft)
      }
      draft.draftSaveNotice = action.show
      break
    }
    case SCREEN_LANDSCAPE: {
      draft.landscape = action.show
      break
    }
    case SCREEN_DISCONNECT_NOTICE: {
      draft.disconnectNotice = action.show
      break
    }
    case SCREEN_END_MAIN: {
      draft.end.type = action.payload.type
      draft.end.surrender = action.payload.surrender
      draft.end.reasons = action.payload.reasons
      break
    }
  }
}, defaultScreen)
