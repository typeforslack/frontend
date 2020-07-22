import React from 'react'
import cx from '../../../helpers/cx'
import styles from '../arena.module.css'

function renderLetters(word) {
  return word.letters.map((letterObj) => (
    <span className={styles[letterObj.state]}>{letterObj.letter}</span>
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
    <div className={styles.arenaContainer}>
      <div className={styles.arenaAction}>
        <div className={styles.arenaPara}>
          {paraObjs.map((wordObj, idx) => (
            <>
              <span
                className={cx({
                  [styles[wordObj.state]]: !letterMode,
                  [styles.current]: !letterMode && idx === currWordIdx,
                })}>
                {letterMode ? renderLetters(wordObj) : wordObj.word}
              </span>{' '}
            </>
          ))}
        </div>
        {countdown && (
          <div className={styles.arenaTimeRemaining}>
            {countdown - secondsSinceStart} secs
          </div>
        )}
        <div>
          <input
            className={cx(styles.arenaInput, {
              [styles[paraObjs[currWordIdx]?.state]]: letterMode,
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
