import { useEffect, useRef } from 'react'
import { saveDraftProgress } from '@/draft/persistence'
import { useDraftState } from '@/draft/useDraftState'
import { getDrawDiscardMode } from '@/utils/drawDiscardMode'
import { useAppSelector } from '@/utils/hooks/useAppDispatch'

const DraftAutosave = () => {
  const draft = useDraftState()
  const status = useAppSelector((state) => state.status)
  const cards = useAppSelector((state) => state.cards)
  const game = useAppSelector((state) => state.game)
  const settings = useAppSelector((state) => state.settings)

  const saveRef = useRef<() => void>(() => {})

  useEffect(() => {
    saveRef.current = () => {
      saveDraftProgress(
        draft,
        draft.mode === 'draftBattle' && draft.lastBattleResult === null
          ? {
              status,
              cards,
              game,
              settings,
              drawDiscardMode: getDrawDiscardMode(),
            }
          : null,
      )
    }
    saveRef.current()
  }, [cards, draft, game, settings, status])

  useEffect(() => {
    const save = () => {
      saveRef.current()
    }
    window.addEventListener('pagehide', save)
    window.addEventListener('beforeunload', save)

    return () => {
      window.removeEventListener('pagehide', save)
      window.removeEventListener('beforeunload', save)
    }
  }, [])

  return null
}

export default DraftAutosave
