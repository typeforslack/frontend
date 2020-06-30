import React from 'react'
import '../arena.css'

export default function ArenaDisplay({ paraObjs, userInput, handleOnChange }) {
  return (
    <div className="arena-container">
      <div className="arena-action">
        <div className="arena-para">
          {paraObjs.map((obj) => (
            <>
              <span className={obj.state}>{obj.letter}</span>
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
