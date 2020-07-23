import { getUserScoreWeekly } from '../../helpers/api'

export async function UserCalculation() {
  const response = await getUserScoreWeekly()
  //calculate total wpm

  console.log(response.data)
  //this gives the dates og the userlog

  var totalWpmSum = 0
  var dayCount = 0
  var totalAccuracySum = 0
  //wpm
  var wpmDateWise = Object.values(response.data).map((item) => {
    var wpmsum = 0
    var accuracysum = 0
    item.forEach((mapWpm) => {
      wpmsum = mapWpm.wpm + wpmsum
      accuracysum = mapWpm.accuracy + accuracysum
      dayCount = dayCount + 1
    })
    totalWpmSum = wpmsum + totalWpmSum
    totalAccuracySum = accuracysum + totalAccuracySum
    return [totalWpmSum, totalAccuracySum]
  })

  //worte the date in dd-mm-yy format
  // var dates = Object.keys(response.data).map((daterev) => {
  //     var ddmmyyDate = daterev.split("-").reverse().join("-")
  //     return ddmmyyDate
  // })
  // let wpmObj = {}
  //created an obj with {date:all wpm on that particular date}
  // var wpmAndAccuracy = dates.map((date) => {
  //     wpmDateWise.map((twpm) => {
  //         wpmObj[date] = twpm
  //         return
  //     })
  //     return
  // })
  // console.log(wpmAndAccuracy)
  // wpmDateWise.forEach(calculateTotalWpm)

  var averageWpm = (wpmDateWise[wpmDateWise.length - 1][0] / dayCount).toFixed(
    2,
  )
  var averageAccuracy = (
    wpmDateWise[wpmDateWise.length - 1][1] / dayCount
  ).toFixed(2)

  return [averageWpm, averageAccuracy]
}

// function wpmAndAccuracycount() {
//     var totalWpmSum = 0
//     var dayCount = 0
//     var totalAccuracySum = 0
// }
