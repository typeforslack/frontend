import React, { Component } from 'react'
import styles from './userStats.module.css'

export default class UserStats extends Component {
  state = {}

  render() {
    return (
      <div className={styles.cardContainer}>
        <h3>
          WPM <br />
          <span className={styles.dashScore}>135</span>
        </h3>
        <span class={styles.divider}></span>
        <h3>
          Accuracy <br />
          <span className={styles.dashScore}>96%</span>
        </h3>
        <span class={styles.divider}></span>
        <h3>
          Number of Races <br />
          <span className={styles.dashScore}>135</span>
        </h3>
        <span class={styles.divider}></span>
        <h3>
          Streak <br />
          <span className={styles.dashScore}>95</span>
        </h3>
      </div>
    )
  }
}
