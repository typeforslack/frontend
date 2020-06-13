import React from 'react'
import Result from './result'
import { evaluateTyping } from '../../helpers/calculations'
import { postUserlog } from '../../helpers/api'
import './arena.css'

export default class TypingArena extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // more verbal, splitting the para into array of characters
      remaining_letters: [...this.props.paragraph],
      typed: [],
      startTime: null,
      countdown: this.props.countdown,
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

    if (this.shouldFinish(newRemaining)) {
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

  shouldFinish(remaining) {
    const { countdown } = this.state
    if (countdown <= 0 || remaining.length === 0) {
      return true
    }
    return false
  }

  async finish() {
    const endTime = new Date()
    const result = evaluateTyping({
      paragraph: this.props.paragraph,
      typed_letters: this.state.typed,
      time_taken: this.props.countdown,
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

  shouldStart() {
    return !this.timer
  }

  start() {
    this.timer = setInterval(() => {
      if (this.state.countdown <= 0) {
        clearInterval(this.timer)
        if (!this.state.result) {
          this.finish()
        }
      }
      this.setState((state) => ({
        ...state,
        countdown: state.countdown - 1,
      }))
    }, 1000)
  }

  handleKeyDown = (e) => {
    if (this.shouldStart()) {
      this.start()
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
    const { remaining_letters, typed, result, countdown } = this.state

    return (
      <div className="arena-container">
        {!result && (
          <div className="arena-action">
            <div className="arena-para">
              {typed.map((typed) => (
                <span style={{ color: typed.isCorrect ? 'green' : 'red' }}>
                  {typed.letter}
                </span>
              ))}
              <span className="remaining">{remaining_letters}</span>
            </div>
            <div className="arena-time-remaining">{countdown} secs</div>
            <div>
              <input
                className="arena-input"
                autoComplete={false}
                autoSave={false}
                placeholder="type here"
                onKeyDown={this.handleKeyDown}
              />
            </div>
          </div>
        )}
        {result && (
          <div className="arena-results">
            <Result {...result} />
          </div>
        )}
      </div>
    )
  }
}
