import React from 'react'
import { isEndScreenNoCloseState } from '@/types/state'
import { useAppSelector } from '@/utils/hooks/useAppDispatch'
import DraftAutosave from './draft/DraftAutosave'
import DraftOverlay from './draft/DraftOverlay'
import DisconnectNotice from './screens/DisconnectNotice'
import DraftBetween from './screens/DraftBetween'
import DraftComplete from './screens/DraftComplete'
import DraftPick from './screens/DraftPick'
import DraftSaveNotice from './screens/DraftSaveNotice'
import EndScreen from './screens/EndScreen'
import Help from './screens/Help'
import LandscapeNotice from './screens/LandscapeNotice'
import LangPref from './screens/LangPref'
import ModeMenu from './screens/ModeMenu'
import Pref from './screens/Pref'
import SgPref from './screens/SgPref'

const GameWindowList = () => {
  const pref = useAppSelector((state) => state.screen.pref)
  const langPref = useAppSelector((state) => state.screen.langPref)
  const sgPref = useAppSelector((state) => state.screen.sgPref)
  const end = useAppSelector((state) => state.screen.end)
  const help = useAppSelector((state) => state.screen.help)
  const modeMenu = useAppSelector((state) => state.screen.modeMenu)
  const draftPick = useAppSelector((state) => state.screen.draftPick)
  const draftBetween = useAppSelector((state) => state.screen.draftBetween)
  const draftComplete = useAppSelector((state) => state.screen.draftComplete)
  const draftSaveNotice = useAppSelector(
    (state) => state.screen.draftSaveNotice,
  )
  const landscape = useAppSelector((state) => state.screen.landscape)
  const disconnectNotice = useAppSelector(
    (state) => state.screen.disconnectNotice,
  )
  const endOpen = isEndScreenNoCloseState(end)

  // lazy loading is a bit slow for those frequently used settings only to save a few KBs, so we don't use it
  return (
    <>
      <DraftAutosave />
      <DraftOverlay />
      {endOpen && <EndScreen {...end} />}
      {!endOpen && draftPick && <DraftPick />}
      {!endOpen && draftBetween && <DraftBetween />}
      {!endOpen && draftComplete && <DraftComplete />}
      {draftSaveNotice && <DraftSaveNotice />}
      {pref && <Pref />}
      {langPref && <LangPref />}
      {sgPref && <SgPref />}
      {help && <Help />}
      {modeMenu && <ModeMenu />}
      {landscape && <LandscapeNotice />}
      {disconnectNotice && <DisconnectNotice />}
    </>
  )
}

export default GameWindowList
