import React from 'react'
import '../arena.css'

function getClassesForWord(idx, wordState, currWordIdx, letterMode) {
  if (letterMode) {
    return ''
  }

  if (idx === currWordIdx) {
    return wordState + ' current'
  }

  return wordState
}

function renderLetters(word) {
  return word.letters.map((letterObj) => (
    <span className={letterObj.state}>{letterObj.letter}</span>
  ))
}

function getInputClassName(letterMode, paraObjs, currWordIdx) {
  let base = 'arena-input '
  if (letterMode) {
    base += paraObjs[currWordIdx].state
  }
  return base
}

export default function ArenaDisplay({
  letterMode,
  paraObjs,
  countdown,
  secondsSinceStart,
  currWordIdx,
  userInput,
  handleOnChange,
}) {
  return (
    <div className="arena-container">
      <div className="arena-action">
        <div className="arena-para">
          {paraObjs.map((wordObj, idx) => (
            <>
              <span
                className={getClassesForWord(
                  idx,
                  wordObj.state,
                  currWordIdx,
                  letterMode,
                )}>
                {letterMode ? renderLetters(wordObj) : wordObj.word}
              </span>{' '}
            </>
          ))}
        </div>
        {countdown && (
          <div className="arena-time-remaining">
            {countdown - secondsSinceStart} secs
          </div>
        )}
        <div>
          <input
            className={getInputClassName(letterMode, paraObjs, currWordIdx)}
            value={userInput}
            onChange={handleOnChange}
            autoComplete="false"
            placeholder="Type here"
            autoFocus={true}
          />
        </div>
      </div>
    </div>
  )
}
