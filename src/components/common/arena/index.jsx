import React from 'react'

export default class TypingArena extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      remaining_letters: this.props.paragraph.split(''),
      typed: [],
      startTime: null,
      endTime: null,
    }
  }

  compare(userTypedLetter) {
    const newRemaining = [...this.state.remaining_letters]
    const currentLetter = newRemaining.shift()

    if (newRemaining.length === 0) {
      this.setState({
        endTime: new Date().getTime() / 1000,
      })
    }

    const typedObj = {
      letter: currentLetter,
      isCorrect: currentLetter === userTypedLetter,
    }

    const newTyped = [...this.state.typed, typedObj]
    this.setState({
      typed: newTyped,
      remaining_letters: newRemaining,
    })
  }

  revert() {
    const newTyped = [...this.state.typed]
    const currentLetter = newTyped.pop().letter

    const newRemaining = [currentLetter, ...this.state.remaining_letters]
    this.setState({
      typed: newTyped,
      remaining_letters: newRemaining,
    })
  }

  handleKeyDown = (e) => {
    console.log(e.key, e.which)

    if (!this.state.startTime) {
      this.setState({
        startTime: new Date().getTime() / 1000,
      })
    }

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
    const { remaining_letters, typed } = this.state

    if (remaining_letters.length == 0) {
      const secs_taken = this.state.endTime - this.state.startTime
      const basic_wpm =
        (this.props.paragraph.split(' ').length * 60) / secs_taken

      return (
        <div>
          <h1>Results</h1>
          <h2>Your WPM: {Math.round(basic_wpm)}</h2>
        </div>
      )
    }

    return (
      <div>
        <div className="parafetch">
          {typed.map((typed) => (
            <span style={{ color: typed.isCorrect ? 'green' : 'red' }}>
              {typed.letter}
            </span>
          ))}
          <span className="remaining">{remaining_letters.join('')}</span>
        </div>
        <div>
          <input
            type="text"
            className="userText"
            name="usertext"
            placeholder="type here"
            onKeyDown={this.handleKeyDown}
          />
        </div>
      </div>
    )
  }
}
