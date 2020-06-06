import React from 'react'

export default class TypingArena extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      remaining_letters: this.props.paragraph.split(''),
      typed: [],
    }
  }

  compare(userTypedLetter) {
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
    const { paragraph } = this.state
    return (
      <div>
        <div className="parafetch">
          {this.state.typed.map((typed) => (
            <span style={{ color: typed.isCorrect ? 'green' : 'red' }}>
              {typed.letter}
            </span>
          ))}
          <span className="remaining">
            {this.state.remaining_letters.join('')}
          </span>
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
