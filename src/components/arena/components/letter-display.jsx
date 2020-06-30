import React from 'react'
import '../arena.css'

function getClassesForWord(idx, wordState, currWordIdx) {
  if (idx === currWordIdx) {
    return wordState + ' current'
  }

  return wordState
}

export default function ArenaDisplay({
  paraObjs,
  currWordIdx,
  userInput,
  handleOnChange,
}) {
  return (
    <div className="arena-container">
      <div className="arena-action">
        <div className="arena-para">
          {paraObjs.map((obj, idx) => (
            <>
              <span className={getClassesForWord(idx, obj.state, currWordIdx)}>
                {obj.letter}
              </span>
            </>
          ))}
        </div>
        <div>
          <input
            className="arena-input"
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
