import React from 'react'

import { navigate } from '@reach/router'
import { Button } from 'react-bootstrap'

export default function Result(props) {
  return (
    <div className="typing-result">
      <h3>Results</h3>
      {props.basicWpm ? <p>Basic WPM: {props.basicWpm}</p> : ''}
      {props.correctWpm ? <p>Correct WPM: {props.correctWpm}</p> : ''}
      <p>Time Taken: {props.timeTaken}s</p>
      <p>Total Words: {props.totalWords}</p>
      <p>Correct Words: {props.correctCount}</p>
      <p>Wrong Words: {props.wrongCount}</p>
      <p>Accuracy: {props.accuracy}%</p>

      <Button onClick={props.retry}>Retry</Button>
      <Button onClick={() => navigate('/')}>Home</Button>
    </div>
  )
}
