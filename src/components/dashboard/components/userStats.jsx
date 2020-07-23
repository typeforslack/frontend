import React, { Component } from 'react'
import styles from './userStats.module.css'
import { UserCalculation } from '../../dashboardcalculations/calculations'

export default class UserStats extends Component {
  state = {
    wpmVal: null,
    accuracyVal: null,
  }

  componentDidMount() {
    this.averagewpm()
  }

  async averagewpm() {
    try {
      const avgWpm = await UserCalculation()
      this.setState({
        wpmVal: avgWpm[0],
        accuracyVal: avgWpm[1],
      })
    } catch (e) {
      console.log('error')
    }
  }

  render() {
    return (
      <div className={styles.cardContainer}>
        <h3>
          WPM <br />
          <span className={styles.dashScore}>{this.state.wpmVal}</span>
        </h3>
        <span className={styles.divider}></span>
        <h3>
          Accuracy <br />
          <span className={styles.dashScore}>{this.state.accuracyVal}</span>
        </h3>
        <span className={styles.divider}></span>
        <h3>
          Number of Races <br />
          <span className={styles.dashScore}>135</span>
        </h3>
        <span className={styles.divider}></span>
        <h3>
          Streak <br />
          <span className={styles.dashScore}>95</span>
        </h3>
      </div>
    )
  }
}
