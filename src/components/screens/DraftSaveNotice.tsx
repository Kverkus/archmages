import React, { useContext } from 'react'
import { SCREEN_DRAFT_SAVE_NOTICE } from '@/constants/ActionTypes'
import { I18nContext } from '@/i18n/I18nContext'
import { useAppDispatch } from '@/utils/hooks/useAppDispatch'
import Window from './Window'
import styles from './Window.module.scss'

const DraftSaveNotice = () => {
  const _ = useContext(I18nContext)
  const dispatch = useAppDispatch()

  const close = () => {
    dispatch({
      type: SCREEN_DRAFT_SAVE_NOTICE,
      show: false,
    })
  }

  return (
    <Window screenActionType={SCREEN_DRAFT_SAVE_NOTICE}>
      <h3 className="text-center">{_.i18n('Draft progress saved')}</h3>
      <p className={styles.description}>
        {_.i18n('Your draft progress has been saved. You can continue later.')}
      </p>
      <div className={styles.buttonwrapper}>
        <button onClick={close}>{_.i18n('OK')}</button>
      </div>
    </Window>
  )
}

export default DraftSaveNotice
