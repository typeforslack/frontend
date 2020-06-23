import React from 'react'
import Result from './result'
import { evaluateTyping } from '../../helpers/calculations'
import { postUserlog } from '../../helpers/api'
import './arena.css'

export default class TestArena extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      paraLetters: this.getLetterArray(),
      typed: [],
      userInput: '',
      countdown: this.getCountdown(),
      result: null,
      currentWordIdx: 0,
    }
    this.timer = false
  }

  getCountdown() {
    const url = new URL(window.location.href)
    const timer = parseInt(url.searchParams.get('timer'))
    return isNaN(timer) ? this.props.countdown : timer
  }

  getLetterArray = () => {
    return this.props.paragraph
      .split('')
      .map((letter) => ({ letter, state: 'untyped' }))
  }

  compare(userInput) {
    const start = performance.now()
    const newParaLetters = this.getLetterArray()

    userInput.split('').forEach((letter, idx) => {
      if (newParaLetters[idx].letter === letter) {
        newParaLetters[idx].state = 'correct'
      } else {
        newParaLetters[idx].state = 'incorrect'
      }
    })

    const end = performance.now()
    console.info(`Took ${end - start} ms`)

    this.setState({
      paraLetters: newParaLetters,
      userInput,
    })

    if (this.shouldFinish()) {
      this.finish()
    }
  }

  shouldFinish() {
    const { countdown } = this.state
    if (countdown === 0) {
      return true
    }
    return false
  }

  async finish() {
    const result = evaluateTyping(this.state.paraLetters, this.getCountdown())
    this.timer = null
    this.setState({
      result,
    })

    try {
      await postUserlog({
        para: this.props.paraID,
        wpm: result.rightCount,
        taken_at: result.timeTaken,
        correct_words: result.rightCount,
        wrong_words: result.wrongcount,
        total_words: result.totalWords,
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
      if (this.state.countdown <= 0 || this.state.paraLetters.length === 0) {
        clearInterval(this.timer)
        if (!this.state.result) {
          this.finish()
        }
        return
      }

      this.setState((state) => ({
        ...state,
        countdown: state.countdown - 1,
      }))
    }, 1000)
  }

  handleOnChange = (e) => {
    const { userInput } = this.state
    if (e.target.value === ' ' && userInput === '') {
      return
    }

    if (this.shouldStart()) {
      this.start()
    }

    this.compare(e.target.value)
  }

  getClassesForWord = (idx, wordState) => {
    if (idx === this.state.currentLetterIdx) {
      return wordState + ' current'
    }

    return wordState
  }

  resetState = () => {
    this.setState({
      paraLetters: this.getLetterArray(),
      currentLetterIdx: 0,
      userInput: '',
      countdown: this.getCountdown(),
      result: null,
    })
  }

  render() {
    const { paraLetters, result, countdown, userInput } = this.state

    return (
      <div className="arena-container">
        {!result && (
          <div className="arena-action">
            <div className="arena-para">
              {paraLetters.map((letterObj, idx) => (
                <>
                  <span
                    className={this.getClassesForWord(idx, letterObj.state)}>
                    {letterObj.letter}
                  </span>
                </>
              ))}
            </div>
            <div className="arena-time-remaining">{countdown} secs</div>
            <div>
              <input
                className="arena-input"
                value={userInput}
                onChange={this.handleOnChange}
                autoComplete="false"
                placeholder="Type here"
                autoFocus={true}
              />
            </div>
          </div>
        )}
        {result && (
          <div className="arena-results">
            <Result retry={this.resetState} {...result} />
          </div>
        )}
      </div>
    )
  }
}
