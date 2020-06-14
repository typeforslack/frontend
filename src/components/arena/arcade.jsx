import React from 'react'
import Result from './result'
import { evaluateArcade } from '../../helpers/calculations'
import { postUserlog } from '../../helpers/api'
import './arena.css'

export default class TypingArena extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      paraWords: this.wordObj(),
      currentWordIdx: 0,
      userInput: '',
      countdown: this.getCountdown(),
      result: null,
    }
    this.timer = false
  }

  getCountdown() {
    const url = new URL(window.location.href)
    const timer = parseInt(url.searchParams.get('timer'))
    return isNaN(timer) ? this.props.countdown : timer
  }

  wordObj = () => {
    const wordObjs = this.props.paragraph
      .split(' ')
      .map((word) => ({ word, state: 'untyped' }))
    return wordObjs
  }

  compare(userInput) {
    const { paraWords, currentWordIdx } = this.state
    if (userInput[userInput.length - 1] === ' ') {
      const newIdx = currentWordIdx + 1
      this.setState({
        userInput: '',
        currentWordIdx: newIdx,
      })
    } else {
      const currentWord = paraWords[currentWordIdx]

      currentWord.state = currentWord.word.startsWith(userInput)
        ? 'correct'
        : 'incorrect'

      this.setState({
        paraWords: [
          ...paraWords.slice(0, currentWordIdx),
          currentWord,
          ...paraWords.slice(currentWordIdx + 1, paraWords.length),
        ],
      })
    }

    if (this.shouldFinish()) {
      this.finish()
    }
  }

  revert() {
    // to copy state array to prevent mutation
    const newTyped = [...this.state.typed]
    const currentLetter = newTyped.pop().letter

    const newRemaining = [currentLetter, ...this.state.remaining_words]
    this.setState({
      typed: newTyped,
      remaining_words: newRemaining,
    })
  }

  shouldFinish() {
    const { countdown } = this.state
    if (countdown === 0) {
      return true
    }
    return false
  }

  async finish() {
    const result = evaluateArcade(this.state.paraWords, this.getCountdown())
    this.timer = false
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
    console.log(this.timer)
    return !this.timer
  }

  start() {
    this.timer = setInterval(() => {
      if (this.state.countdown <= 0 || this.state.paraWords.length === 0) {
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

    this.setState({
      userInput: e.target.value,
    })
    if (this.shouldStart()) {
      this.start()
    }

    this.compare(e.target.value)
  }

  getClassesForWord = (idx, wordState) => {
    if (idx === this.state.currentWordIdx) {
      return wordState + ' current'
    }

    return wordState
  }

  resetState = () => {
    this.setState({
      paraWords: this.wordObj(),
      currentWordIdx: 0,
      userInput: '',
      countdown: this.getCountdown(),
      result: null,
    })
  }

  render() {
    const { paraWords, result, countdown, userInput } = this.state

    return (
      <div className="arena-container">
        {!result && (
          <div className="arena-action">
            <div className="arena-para">
              {paraWords.map((wordObj, idx) => (
                <>
                  <span className={this.getClassesForWord(idx, wordObj.state)}>
                    {wordObj.word}
                  </span>{' '}
                </>
              ))}
            </div>
            <div className="arena-time-remaining">{countdown} secs</div>
            <div>
              <input
                className="arena-input"
                value={userInput}
                onChange={this.handleOnChange}
                autoComplete={false}
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
