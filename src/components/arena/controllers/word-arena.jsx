import React from 'react'
import WordDisplay from '../components/word-display'

export default class TypingArena extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      paraWords: this.wordObj(),
      currentWordIdx: 0,
      userInput: '',
      secondsSinceStart: 0,
      done: false,
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

  finish() {
    clearTimeout(this.timer)
    this.timer = null

    this.setState({
      done: true,
    })

    const { paraWords, secondsSinceStart } = this.state
    this.props.evaluateResult(paraWords, secondsSinceStart)
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

  render() {
    if (this.state.done) {
      return null
    }

    return (
      <WordDisplay
        letterMode={this.props.letterComparison}
        paraObjs={this.state.paraWords}
        countdown={this.props.countdown}
        secondsSinceStart={this.state.secondsSinceStart}
        currWordIdx={this.state.currentWordIdx}
        userInput={this.state.userInput}
        handleOnChange={this.handleOnChange}
      />
    )
  }
}
