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

export function evaluateTyping({ paragraph, typed_letters, time_taken }) {
  const real_words = paragraph.split(' ')
  const timeTaken = Math.round(time_taken)
  const basicWpm = Math.round((real_words.length * 60) / timeTaken)

  const correct_words_arr = getCorrectOnlyStringFromTypedLetters(typed_letters)

  let correctCount = 0,
    wrongCount = 0

  real_words.forEach((word, i) => {
    if (correct_words_arr[i] === word) {
      correctCount++
    } else {
      wrongCount++
    }
  })

  const correctWpm = Math.round((correctCount * 60) / timeTaken)
  const accuracy = ((correctCount / real_words.length) * 100).toFixed(2)

  return {
    basicWpm,
    correctWpm,
    accuracy,
    correctCount,
    wrongCount,
    totalWords: real_words.length,
    timeTaken: timeTaken,
  }
}

export function evaluateArcade(parawords, seconds) {
  const rightTyped = parawords.filter((type) => {
    return type.state === 'correct'
  })
  const correctCount = rightTyped.length

  const wrongTyped = parawords.filter((type) => {
    return type.state === 'incorrect'
  })
  const wrongCount = wrongTyped.length

  const totalWords = correctCount + wrongCount
  const accuracy = Math.round((correctCount / totalWords) * 100, 2)
  const correctWpm = Math.round((correctCount * 60) / seconds)
  console.log('Evaluate Arcade: ', parawords, seconds)
  return {
    correctCount,
    wrongCount,
    accuracy,
    timeTaken: seconds,
    totalWords,
    correctWpm,
  }
}
