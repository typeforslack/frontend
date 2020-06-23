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

  compare(userInput) {
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

    console.log(userInput, currentWord.word, currentWord.state)

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

  shouldFinish() {
    const { countdown, currentWordIdx, paraWords } = this.state
    if (countdown === 0 || currentWordIdx === paraWords.length + 1) {
      return true
    }
    return false
  }

  async finish() {
    const result = evaluateArcade(this.state.paraWords, this.getCountdown())
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
                    {this.props.letterComparison
                      ? this.renderLetters(wordObj)
                      : wordObj.word}
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
