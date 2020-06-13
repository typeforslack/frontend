import React from 'react'
import Result from './result'
import { evaluateTyping } from '../../helpers/calculations'
import { postUserlog } from '../../helpers/api'
import './arena.css'

export default class TypingArena extends React.Component {
  constructor(props) {
    super(props)

    const wordObjs = this.props.paragraph
      .split(' ')
      .map((word) => ({ word, state: 'untyped' }))

    this.state = {
      paraWords: wordObjs,
      currentWordIdx: 0,
      userInput: '',
      countdown: this.props.countdown,
      result: null,
    }
  }

  compare(userInput) {
    const { paraWords, currentWordIdx } = this.state
    console.log('In compare: ', userInput)

    if (userInput[userInput.length - 1] === ' ') {
      const newIdx = currentWordIdx + 1
      this.setState({
        userInput: '',
        currentWordIdx: newIdx,
      })
    } else {
      const currentWord = paraWords[currentWordIdx]
      console.log('CHECK: ', currentWord.word, userInput)
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
    if (countdown <= 0) {
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

  handleOnChange = (e) => {
    const { userInput } = this.state
    if (e.target.value === ' ' && userInput === '') {
      console.log('Blooop pressing space when empty')
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
