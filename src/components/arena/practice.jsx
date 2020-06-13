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
    if (userTypedLetter !== ' ') {
      const userWord = this.state.currentWordUserTyping + userTypedLetter
      const currentWord = this.state.paraWords[0]
      const isWordCorrect = currentWord.startsWith(userWord)
      this.setState({
        currentWordUserTyping: userWord,
        isCurrentWordCorrect: isWordCorrect,
      })
    } else {
      const newParaWords = [...this.state.paraWords]
      newParaWords.shift()
      this.setState({
        currentWordUserTyping: '',
        isCurrentWordCorrect: true,
        paraWords: newParaWords,
      })
    }

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
    if (['Shift', 'Alt', 'Control', 'Tab'].indexOf(e.key) !== -1) {
      return
    }
    console.log(e.key, e.which)
    if (e.key === 'Backspace' && this.state.typed.length !== 0) {
      this.revert()
    } else {
      this.compare(e.key)
    }
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
            <div className="arena-para">
              {typed.map((typed) => (
                <span
                  style={{
                    color: typed.isCorrect ? 'green' : 'red',
                    backgroundColor: isCurrentWordCorrect
                      ? 'greenYellow'
                      : 'red',
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
                autoComplete="false"
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
