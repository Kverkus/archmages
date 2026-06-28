import { useSyncExternalStore } from 'react'
import { getDraftState, subscribeDraftState } from './store'

export const useDraftState = () =>
  useSyncExternalStore(subscribeDraftState, getDraftState, getDraftState)
