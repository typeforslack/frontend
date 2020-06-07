import React from 'react'
import Result from './result'
import { evaluateTyping } from '../../../helpers/calculations'
import { postUserlog } from '../../../helpers/api'
import './arena.css'

export default class TypingArena extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // more verbal, splitting the para into array of characters
      remaining_letters: [...this.props.paragraph],
      typed: [],
      startTime: null,
      result: null,
    }
  }

  compare(userTypedLetter) {
    // to copy the state array to prevent mutation
    const newRemaining = [...this.state.remaining_letters]

    const currentLetter = newRemaining.shift()

    const typedObj = {
      letter: currentLetter,
      isCorrect: currentLetter === userTypedLetter,
    }

    const newTyped = [...this.state.typed, typedObj]
    this.setState({
      typed: newTyped,
      remaining_letters: newRemaining,
    })

    if (newRemaining.length === 0) {
      this.finish()
    }
  }

  revert() {
    // to copy state array to prevent mutation
    const newTyped = [...this.state.typed]
    const currentLetter = newTyped.pop().letter

    const newRemaining = [currentLetter, ...this.state.remaining_letters]
    this.setState({
      typed: newTyped,
      remaining_letters: newRemaining,
    })
  }

  async finish() {
    const endTime = new Date()
    const result = evaluateTyping({
      paragraph: this.props.paragraph,
      typed_letters: this.state.typed,
      startTime: this.state.startTime,
      endTime: endTime.getTime() / 1000,
    })

    this.setState({
      result,
    })

    try {
      await postUserlog({
        para: this.props.paraID,
        wpm: result.correct_wpm,
        taken_at: endTime.toISOString(),
        correct_words: result.correct_count,
        wrong_words: result.wrong_count,
        total_words: result.total_words,
        accuracy: result.accuracy,
      })
    } catch (e) {
      console.log(e.response)
    }
  }

  handleKeyDown = (e) => {
    if (!this.state.startTime) {
      this.setState({
        startTime: new Date().getTime() / 1000,
      })
    }
    // TODO: Find and add other unnecessary symbols too
    if (['Shift', 'Alt', 'Ctrl'].indexOf(e.key) !== -1) {
      return
    }

    if (e.key === 'Backspace') {
      this.revert()
    } else {
      this.compare(e.key)
    }
  }

  render() {
    const { remaining_letters, typed, result } = this.state

    return (
      <div>
        {!result && (
          <>
            <div className="parafetch">
              {typed.map((typed) => (
                <span style={{ color: typed.isCorrect ? 'green' : 'red' }}>
                  {typed.letter}
                </span>
              ))}
              <span className="remaining">{remaining_letters}</span>
            </div>
            <div>
              <input
                className="userText"
                placeholder="type here"
                onKeyDown={this.handleKeyDown}
              />
            </div>
          </>
        )}
        {result && (
          <div className="results">
            <Result {...result} />
          </div>
        )}
      </div>
    )
  }
}
