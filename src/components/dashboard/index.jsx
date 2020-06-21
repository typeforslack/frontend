import React, { Component } from 'react'
import Header from '../common/header'
import UserStats from './components/userStats'
import ParagraphsCard from './components/paragraphsCard'
import ProgressCard from './components/progressCard'
import styles from './dashboard.module.css'

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className={styles.dashboard}>
          <h3 className={styles.title}>User Stats</h3>
          <UserStats />
          <ProgressCard />
          <ParagraphsCard />
        </div>
      </div>
    )
  }
}
