import React from 'react'
import Result from '../result'
import { evaluateArcade } from '../../../helpers/calculations'
import { postUserlog } from '../../../helpers/api'
import '../arena.css'

export default class TypingArena extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      paraWords: this.wordObj(),
      currentWordIdx: 0,
      userInput: '',
      secondsSinceStart: 0,
      result: null,
    }
    this.timer = null
  }

  wordObj = () => {
    const wordObjs = this.props.paragraph.split(' ').map((word) => ({
      word,
      state: 'untyped',
      letters: this.getComparedLetters(word),
    }))
    return wordObjs
  }

  getComparedLetters = (word, userInput = '') => {
    const letters = [...word].map((letter) => ({
      letter,
      state: 'untyped',
    }))

    // When userInput string is empty this is skipped resulting in default values
    userInput.split('').forEach((letter, idx) => {
      if (idx >= letters.length) {
        return
      }

      if (letters[idx].letter === letter) {
        letters[idx].state = 'correct'
      } else {
        letters[idx].state = 'incorrect'
      }
    })

    return letters
  }

  async compare(userInput) {
    const { paraWords, currentWordIdx } = this.state
    const { letterComparison } = this.props

    const currentWord = paraWords[currentWordIdx]
    let newIdx = currentWordIdx

    if (userInput[userInput.length - 1] === ' ') {
      const wordWithoutSpace = userInput.substr(0, userInput.length - 1)
      currentWord.state =
        currentWord.word === wordWithoutSpace ? 'correct' : 'incorrect'

      if (
        !letterComparison ||
        (letterComparison && currentWord.state === 'correct')
      ) {
        userInput = ''
        newIdx = currentWordIdx + 1
      }
    } else {
      currentWord.state = currentWord.word.startsWith(userInput)
        ? 'typing'
        : 'incorrect'

      if (letterComparison) {
        currentWord.letters = this.getComparedLetters(
          currentWord.word,
          userInput,
        )
      }
    }

    this.setState({
      paraWords: [
        ...paraWords.slice(0, currentWordIdx),
        currentWord,
        ...paraWords.slice(currentWordIdx + 1, paraWords.length),
      ],
      userInput,
      currentWordIdx: newIdx,
    })

    if (this.shouldFinish()) {
      this.finish()
    }
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

  shouldFinish() {
    const { secondsSinceStart, currentWordIdx, paraWords } = this.state
    const { countdown } = this.props
    if (countdown && secondsSinceStart >= countdown) {
      return true
    }

    if (currentWordIdx >= paraWords.length) {
      return true
    }

    return false
  }

  async finish() {
    clearTimeout(this.timer)
    this.timer = null
    const { paraWords, secondsSinceStart } = this.state
    const result = evaluateArcade(paraWords, secondsSinceStart)
    this.setState({
      result,
    })

    try {
      await postUserlog({
        para: this.props.paraID,
        wpm: result.correctWpm,
        taken_at: new Date().toISOString(),
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
      this.setState((state) => ({
        ...state,
        secondsSinceStart: state.secondsSinceStart + 1,
      }))

      if (this.shouldFinish()) {
        this.finish()
      }
    }, 1000)
  }

  getClassesForWord = (idx, wordState) => {
    if (this.props.letterComparison) {
      return ''
    }

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

  renderLetters = (word) => {
    return word.letters.map((letterObj) => (
      <span className={letterObj.state}>{letterObj.letter}</span>
    ))
  }

  getInputClassName = () => {
    let base = 'arena-input '
    if (this.props.letterComparison && !this.shouldFinish()) {
      base += this.state.paraWords[this.state.currentWordIdx].state
    }
    return base
  }

  render() {
    const { paraWords, result, secondsSinceStart, userInput } = this.state
    const { countdown } = this.props
    return (
      <div className="arena-container">
        {!result && (
          <div className="arena-action">
            <div className="arena-para">
              {paraWords.map((wordObj, idx) => (
                <>
                  <span className={this.getClassesForWord(idx, wordObj.state)}>
                    {this.props.letterComparison
                      ? this.renderLetters(wordObj)
                      : wordObj.word}
                  </span>{' '}
                </>
              ))}
            </div>
            {countdown && (
              <div className="arena-time-remaining">
                {countdown - secondsSinceStart} secs
              </div>
            )}
            <div>
              <input
                className={this.getInputClassName()}
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
