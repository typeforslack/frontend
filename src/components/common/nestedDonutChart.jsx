import React, { Component } from 'react'
import styles from './nestedDonutChart.module.css'

export default class NestedDonutChart extends Component {
  state = {
    totalWords: 563,
    practiceWords: 0,
    arcadeWords: 0,
    practisePercent: 20,
    arcadePercent: 70,
  }

  render() {
    const { totalWords, practisePercent, arcadePercent } = this.state
    return (
      <svg height="213" width="213">
        <circle
          cx="70"
          cy="70"
          r="70"
          fill="none"
          strokeWidth="10"
          transform="translate(36, 178) rotate(-90)"
          strokeDasharray="440"
          strokeLinecap="round"
          strokeDashoffset={440 - (440 * 100) / 100}
          stroke="#F0A500"
        />
        <circle
          cx="70"
          cy="70"
          r="85"
          fill="none"
          strokeWidth="10"
          transform="translate(36, 178) rotate(-90)"
          strokeDasharray="534"
          strokeLinecap="round"
          strokeDashoffset={534 - (534 * arcadePercent) / 100}
          stroke="#E01E5A"
        />
        <circle
          cx="70"
          cy="70"
          r="100"
          fill="none"
          strokeWidth="10"
          transform="translate(36, 178) rotate(-90)"
          strokeDasharray="629"
          strokeLinecap="round"
          strokeDashoffset={534 - (534 * practisePercent) / 100}
          stroke="#DF6C01"
        />
        <text
          className={styles.totalWords}
          x="50%"
          y="47%"
          dominantBaseline="middle"
          textAnchor="middle">
          {totalWords}
        </text>
        <text
          className={styles.totalWordsDescription}
          x="50%"
          y="57%"
          dominantBaseline="middle"
          textAnchor="middle">
          Total Paras
        </text>
      </svg>
    )
  }
}
