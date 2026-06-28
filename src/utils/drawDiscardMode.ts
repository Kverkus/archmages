export type DrawDiscardModeType = {
  remaining: number
  drawAfterDiscard: boolean
  playagain: boolean
}

const emptyMode: DrawDiscardModeType = {
  remaining: 0,
  drawAfterDiscard: false,
  playagain: false,
}

let mode = emptyMode

export const startDrawDiscardMode = (nextMode: DrawDiscardModeType) => {
  mode = {
    ...nextMode,
    remaining: Math.max(0, nextMode.remaining),
  }
}

export const clearDrawDiscardMode = () => {
  mode = emptyMode
}

export const getDrawDiscardMode = (): DrawDiscardModeType => ({ ...mode })

export const restoreDrawDiscardMode = (nextMode: DrawDiscardModeType) => {
  mode = {
    remaining: Math.max(0, nextMode.remaining),
    drawAfterDiscard: nextMode.drawAfterDiscard,
    playagain: nextMode.playagain,
  }
}

export const consumeDrawDiscard = (): DrawDiscardModeType => {
  if (mode.remaining <= 0) {
    return emptyMode
  }

  mode = {
    ...mode,
    remaining: mode.remaining - 1,
  }

  return mode
}
