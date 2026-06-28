import cl from 'clarr'
import React, { useContext } from 'react'
import MultilineText from '@/components/special/MultilineText'
import { SCREEN_HELP } from '@/constants/ActionTypes'
import {
  authorUrl,
  appVersion,
  upstreamGithubUrl,
} from '@/constants/devSettings'
import { I18nContext } from '@/i18n/I18nContext'
import Window from './Window'
import styles from './Window.module.scss'

const Help = () => {
  const _ = useContext(I18nContext)

  return (
    <Window screenActionType={SCREEN_HELP}>
      <small className={cl(styles.version, 'select-all')}>v{appVersion}</small>
      <p className={cl(styles.description, 'select-text')}>
        {_.i18n('ArcoMage HD') !== 'ArcoMage HD' && (
          <>
            <strong>{_.i18n('ArcoMage HD')}</strong>
            <> - </>
          </>
        )}
        {_.i18n('DESC')}
      </p>
      <p className="help-text select-text">
        <strong>
          The project is based on the open-source remake{' '}
          <a href={upstreamGithubUrl} target="_blank" rel="noopener noreferrer">
            ArcoMage HD
          </a>{' '}
          by{' '}
          <a href={authorUrl} target="_blank" rel="noopener noreferrer">
            tomchen
          </a>
          .
        </strong>
      </p>
      <p className="help-text select-text">
        <strong>
          {_.i18n('Game rules')}
          {_.i18n(': ')}
        </strong>
      </p>
      <div className="help-text select-text">
        {<MultilineText>{_.i18n('GAMERULES')}</MultilineText>}
      </div>
    </Window>
  )
}

export default Help
