import React from 'react'
import LetterDisplay from '../components/letter-display'
import '../arena.css'

export default class TestArena extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      paraLetters: this.getLetterArray(),
      userInput: '',
      done: false,
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

  finish() {
    const endTime = new Date()
    const timeTaken = this.startTime - endTime.getSeconds()

    this.setState({
      done: true,
    })

    this.props.evaluateResult(this.state.paraLetters, timeTaken)
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

  render() {
    if (this.state.done) {
      return null
    }

    return (
      <LetterDisplay
        paraObjs={this.state.paraLetters}
        userInput={this.state.userInput}
        handleOnChange={this.handleOnChange}
      />
    )
  }
}
