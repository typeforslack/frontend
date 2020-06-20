import React, { Component } from 'react'
import Header from '../common/header'
import LineChart from '../common/charts/lineChart'
import UserStats from './components/userStats'
import ParagraphsCard from './components/paragraphsCard'
import styles from './dashboard.module.css'

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className={styles.dashboard}>
          <h3 className={styles.dashboardTitle}>User Stats</h3>
          <UserStats />
          <LineChart width={760} height={300} />
          <ParagraphsCard />
        </div>
      </div>
    )
  }
}
