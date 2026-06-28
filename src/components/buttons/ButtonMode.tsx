import cl from 'clarr'
import React, { useContext } from 'react'
import { SCREEN_MODE_MENU } from '@/constants/ActionTypes'
import { I18nContext } from '@/i18n/I18nContext'
import { useAppDispatch, useAppSelector } from '@/utils/hooks/useAppDispatch'
import isScreenState from '@/utils/isScreenState'
import { tooltipAttrs } from '@/utils/tooltip'
import styles from './ButtonMode.module.scss'

const ButtonMode = () => {
  const _ = useContext(I18nContext)
  const modeMenu = useAppSelector((state) => state.screen.modeMenu)
  const isScreen = useAppSelector(isScreenState)
  const dispatch = useAppDispatch()

  const clickFunc = () => {
    dispatch({
      type: SCREEN_MODE_MENU,
      show: true,
    })
  }

  return (
    <button
      {...(isScreen ? { tabIndex: -1 } : {})}
      accessKey="m"
      className={cl('topbutton', styles.modebutton, modeMenu && 'opacity-100')}
      onClick={clickFunc}
      onAuxClick={clickFunc}
      {...tooltipAttrs(_.i18n('Game mode'), 'bottom')}
      aria-label={_.i18n('Game mode')}
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" />
      </svg>
    </button>
  )
}

export default ButtonMode
