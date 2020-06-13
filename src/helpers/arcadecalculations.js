export function arcadeCalculations(parawords) {
  const rightTyped = parawords.filter((type) => {
    return type.state === 'correct'
  })

  const rightCount = rightTyped.length
  const wrongTyped = parawords.filter((type) => {
    return type.state === 'incorrect'
  })
  const wrongcount = wrongTyped.length
  const totalWords = rightCount + wrongcount
  const accuracy = Math.round((rightCount / totalWords) * 100, 2)

  return {
    rightCount,
    wrongcount,
    accuracy,
    time_taken: 60,
    totalWords,
  }
}
