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
      result: null,

      paraWords: this.props.paragraph.split(' '),
      currentWordUserTyping: [],
      isCurrentWordCorrect: true,
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

    // Word correct logic
    if (this.state.isCurrentWordCorrect && currentLetter === ' ') {
      const newParaWords = [...this.state.paraWords]
      newParaWords.shift()
      this.setState({
        currentWordUserTyping: '',
        isCurrentWordCorrect: true,
        paraWords: newParaWords,
      })

      this.resetTextfield()
    } else {
      console.log('User typed letter', userTypedLetter)
      const userWord = this.state.currentWordUserTyping + userTypedLetter
      const currentWord = this.state.paraWords[0]
      const isWordCorrect = currentWord.startsWith(userWord)
      this.setState({
        currentWordUserTyping: userWord,
        isCurrentWordCorrect: isWordCorrect,
      })
    }

    if (newRemaining.length === 0) {
      this.finish()
    }
  }

  revert() {
    if (this.state.currentWordUserTyping === '') {
      return
    }
    // to copy state array to prevent mutation
    const newTyped = [...this.state.typed]

    const currentLetter = newTyped.pop().letter

    const newRemaining = [currentLetter, ...this.state.remaining_letters]
    this.setState({
      typed: newTyped,
      remaining_letters: newRemaining,
    })

    const userWord = this.state.currentWordUserTyping
    const newCurrentWord = userWord.substr(0, userWord.length - 1)
    const currentWord = this.state.paraWords[0]
    const isWordCorrect = currentWord.startsWith(newCurrentWord)
    this.setState({
      currentWordUserTyping: newCurrentWord,
      isCurrentWordCorrect: isWordCorrect,
    })
  }

  async finish() {
    const endTime = new Date()
    const result = evaluateTyping({
      paragraph: this.props.paragraph,
      typed_letters: this.state.typed,
      time_taken: endTime.getTime() / 1000 - this.state.startTime,
    })

    this.setState({
      result,
    })

    try {
      await postUserlog({
        para: this.props.paraID,
        wpm: result.correctWpm,
        taken_at: endTime.toISOString(),
        correct_words: result.correctCount,
        wrong_words: result.wrongCount,
        total_words: result.totalWords,
        accuracy: result.accuracy,
      })
    } catch (e) {
      console.log(e.response)
    }
  }

  shouldStart() {
    return !this.state.startTime
  }

  start() {
    this.setState({
      startTime: new Date().getTime() / 1000,
    })
  }

  handleKeyDown = (e) => {
    if (this.shouldStart()) {
      this.start()
    }
    // TODO: Find and add other unnecessary symbols too
    if (['Shift', 'Alt', 'Control', 'Tab', 'Meta'].indexOf(e.key) !== -1) {
      return
    }
    console.log(e.key, e.which)
    if (e.key === 'Backspace' && this.state.typed.length !== 0) {
      this.revert()
    }

    if (e.key !== 'Backspace') {
      this.compare(e.key)
    }
  }

  resetTextfield = () => {
    if (this.props.strictMode) {
      return
    }
    console.log('Clearing')
    // Temporary hack
    document.getElementById('textref').value = ''
  }

  resetState = () => {
    this.setState({
      remaining_letters: [...this.props.paragraph],
      typed: [],
      startTime: null,
      result: null,

      paraWords: this.props.paragraph.split(' '),
      currentWordUserTyping: [],
      isCurrentWordCorrect: true,
    })
  }

  render() {
    const {
      remaining_letters,
      typed,
      result,
      isCurrentWordCorrect,
    } = this.state

    return (
      <div className="arena-container">
        {!result && (
          <div className="arena-action">
            <div className="arena-word-highlight"></div>
            <div className="arena-para">
              {typed.map((typed) => (
                <span
                  style={{
                    color: typed.isCorrect ? 'green' : 'red',
                  }}>
                  {typed.letter}
                </span>
              ))}
              <span className="remaining">{remaining_letters}</span>
            </div>
            <div>
              <input
                id="textref"
                className="arena-input"
                style={{
                  backgroundColor:
                    !isCurrentWordCorrect && !this.props.strictMode
                      ? 'rgba(255,7,58,.6)'
                      : '',
                }}
                autoComplete="false"
                placeholder="type here"
                onKeyDown={this.handleKeyDown}
              />
            </div>
          </div>
        )}
        {result && (
          <div className="arena-results">
            <Result {...result} retry={this.resetState} />
          </div>
        )}
      </div>
    )
  }
}
