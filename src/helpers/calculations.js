/**
 * From a list of typed letters, produces an array of words formed using
 * only the correct letters which user types
 * Original Text: This is Good
 * User types: Tjis is Gopd
 * Output: [Tis, is, God]
 * @param {*} typed_letters Array of typed_letter objects
 */
function getCorrectOnlyStringFromTypedLetters(typed_letters) {
  return typed_letters
    .filter((obj) => {
      return obj.letter === ' ' || obj.isCorrect
    })
    .map((obj) => obj.letter)
    .join('')
    .split(' ')
}

export function evaluateTyping({
  paragraph,
  typed_letters,
  startTime,
  endTime,
}) {
  const secs_taken = endTime - startTime

  const real_words = paragraph.split(' ')
  const basic_wpm = Math.round((real_words.length * 60) / secs_taken)

  const correct_words_arr = getCorrectOnlyStringFromTypedLetters(typed_letters)

  let correct_count = 0,
    wrong_count = 0

  real_words.forEach((word, i) => {
    if (correct_words_arr[i] === word) {
      correct_count++
    } else {
      wrong_count++
    }
  })

  const correct_wpm = Math.round((correct_count * 60) / secs_taken)
  const accuracy = ((correct_count / real_words.length) * 100).toFixed(2)

  return {
    basic_wpm,
    correct_wpm,
    accuracy,
    correct_count,
    wrong_count,
    total_words: real_words.length,
    time_taken: secs_taken,
  }
}
