import React from 'react'
import ButtonFullscreen from './ButtonFullscreen'
import ButtonGithub from './ButtonGithub'
import ButtonHelp from './ButtonHelp'
import ButtonLangPref from './ButtonLangPref'
import ButtonMode from './ButtonMode'
import ButtonPref from './ButtonPref'
import ButtonSgPref from './ButtonSgPref'

const ButtonBar = () => (
  <div role="navigation">
    <ButtonMode />
    <ButtonPref />
    <ButtonLangPref />
    <ButtonSgPref />
    <ButtonFullscreen />
    <ButtonHelp />
    <ButtonGithub />
  </div>
)

export default ButtonBar
