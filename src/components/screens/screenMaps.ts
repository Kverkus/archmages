import cl from 'clarr'
import {
  SCREEN_PREF,
  SCREEN_LANG_PREF,
  SCREEN_VOLUME_PREF,
  SCREEN_HELP,
  SCREEN_MODE_MENU,
  SCREEN_DRAFT_PICK,
  SCREEN_DRAFT_BETWEEN,
  SCREEN_DRAFT_COMPLETE,
  SCREEN_DRAFT_SAVE_NOTICE,
  SCREEN_LANDSCAPE,
  SCREEN_DISCONNECT_NOTICE,
} from '@/constants/ActionTypes'
import styles from './Window.module.scss'

export const screenClassMap = {
  [SCREEN_PREF]: styles.screenpref,
  [SCREEN_LANG_PREF]: cl(styles.screenlangpref, 'screenlangpref'),
  [SCREEN_VOLUME_PREF]: styles.screenvolumepref,
  [SCREEN_HELP]: styles.screenhelp,
  [SCREEN_MODE_MENU]: styles.screenmodemenu,
  [SCREEN_DRAFT_PICK]: styles.screendraftpick,
  [SCREEN_DRAFT_BETWEEN]: styles.screendraftbetween,
  [SCREEN_DRAFT_COMPLETE]: styles.screendraftcomplete,
  [SCREEN_DRAFT_SAVE_NOTICE]: styles.screendraftsavenotice,
  [SCREEN_LANDSCAPE]: '',
  [SCREEN_DISCONNECT_NOTICE]: '',
}

export const screenTitleMap = {
  [SCREEN_PREF]: 'Preferences',
  [SCREEN_LANG_PREF]: 'Language',
  [SCREEN_VOLUME_PREF]: 'Sound & Graphics',
  [SCREEN_HELP]: 'Help',
  [SCREEN_MODE_MENU]: 'Game mode',
  [SCREEN_DRAFT_PICK]: 'Draft',
  [SCREEN_DRAFT_BETWEEN]: 'Between Matches',
  [SCREEN_DRAFT_COMPLETE]: 'Draft Complete',
  [SCREEN_DRAFT_SAVE_NOTICE]: 'Draft progress saved',
  [SCREEN_LANDSCAPE]: 'Please rotate your device to landscape mode',
  [SCREEN_DISCONNECT_NOTICE]:
    'You and your opponent are disconnected. Please go to "Preferences" and start a new game.',
}
