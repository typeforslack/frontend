import React from 'react'
import cx from '../../../helpers/cx'
import '../arena.css'

function renderLetters(word) {
  return word.letters.map((letterObj) => (
    <span className={letterObj.state}>{letterObj.letter}</span>
  ))
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
                className={cx({
                  [wordObj.state]: !letterMode,
                  current: !letterMode && idx === currWordIdx,
                })}>
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
            className={cx('arena-input', {
              [paraObjs[currWordIdx]?.state]: letterMode,
            })}
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
