import React from 'react'

export default function Result(props) {
  return (
    <div className="typing-result">
      <h3>Results</h3>
      <p>Your WPM: {props.basic_wpm}</p>
      <p>Correct WPM: {props.correct_wpm}</p>
      <p>Time Taken: {props.time_taken}s</p>
      <p>Total Words: {props.total_words}</p>
      <p>Correct Words: {props.correct_count}</p>
      <p>Wrong Words: {props.wrong_count}</p>
      <p>Accuracy: {props.accuracy}%</p>
    </div>
  )
}
