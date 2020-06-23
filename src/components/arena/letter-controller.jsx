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
      userInput: '',
      result: null,
      currentWordIdx: 0,
    }
    this.startTime = null
  }

  getLetterArray = () => {
    return this.props.paragraph
      .split('')
      .map((letter) => ({ letter, state: 'untyped' }))
  }

  compare(userInput) {
    const start = performance.now()
    const newParaLetters = this.getLetterArray()

    if (this.shouldFinish()) {
      this.finish()
      return
    }

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
  }

  shouldFinish() {
    const { paraLetters, userInput } = this.state
    if (userInput.length >= paraLetters.length) {
      return true
    }
    return false
  }

  async finish() {
    const endTime = new Date()
    const result = evaluateTyping({
      paragraph: this.props.paragraph,
      typed_letters: this.state.paraLetters,
      time_taken: endTime.getSeconds() - this.startTime,
    })
    this.setState({
      result,
    })

    try {
      await postUserlog({
        para: this.props.paraID,
        wpm: result.correctWpm,
        taken_at: endTime.toISOString(),
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
    return !this.startTime
  }

  start() {
    this.startTime = new Date().getSeconds()
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
      userInput: '',
      result: null,
    })
  }

  render() {
    const { paraLetters, result, userInput } = this.state

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
