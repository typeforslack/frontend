import React from 'react'
import styles from '../arena.module.css'

export default function ArenaDisplay({ paraObjs, userInput, handleOnChange }) {
  return (
    <div className={styles.arenaContainer}>
      <div className={styles.arenaAction}>
        <div className={styles.arenaPara}>
          {paraObjs.map((obj) => (
            <>
              <span className={styles[obj.state]}>{obj.letter}</span>
            </>
          ))}
        </div>
        <div>
          <input
            className={styles.arenaInput}
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
