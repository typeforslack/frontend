import React from 'react'
import { evaluateTyping } from '../../../helpers/calculations'

export default function Result({ paragraph, typed, startTime, endTime }) {
  const result = evaluateTyping({
    paragraph,
    typed_letters: typed,
    startTime,
    endTime,
  })

  return (
    <div className="typing-result">
      <h3>Results</h3>
      <p>Your WPM: {result.basic_wpm}</p>
      <p>Correct WPM: {result.correct_wpm}</p>
      <p>Time Taken: {result.secs_taken}s</p>
      <p>Total Words: {result.total_words}</p>
      <p>Correct Words: {result.correct_count}</p>
      <p>Wrong Words: {result.wrong_count}</p>
      <p>Accuracy: {result.accuracy}%</p>
    </div>
  )
}
