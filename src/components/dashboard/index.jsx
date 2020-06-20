import React, { Component } from 'react'
import LineChart from '../common/lineChart'
import NestedDonutChart from '../common/nestedDonutChart'
import Labels from './labels'
import Dropdown from './dropdown'
import styles from './dashboard.module.css'
import './index.css'
import { Link } from '@reach/router'
import UserStats from './userStats'

export default class Dashboard extends Component {
  state = {
    labelData: [
      {
        title: 'Total',
        color: '#F0A500',
      },
      {
        title: 'Practise',
        color: '#DF6C01',
      },
      {
        title: 'Arcade',
        color: '#E01E5A',
      },
    ],
    labelOrientation: 'vertical',
    dropdownData: ['All Time', 'Weekly', 'Monthly'],
  }

  render() {
    return (
      <div>
        <header>
          <p className="navlogo">TypeForSlack</p>
          <nav className="nav">
            <ul>
              <li>
                <Link to="/dashboard">Practice</Link>
              </li>
              <li>
                <Link to="/dashboard">Arcade</Link>
              </li>
              <li>
                <Link to="/dashboard">Race</Link>
              </li>
            </ul>
            <span className="nav-indicator"></span>
          </nav>
        </header>
        <div className="dashBoard">
          <h3 className="dashTitle">User Stats</h3>
          <UserStats />
          <LineChart width={760} height={300} />
          <div className={styles.paragraphsCard}>
            <div className={styles.paragraphsCardTitle}>
              <h4>Paragraphs</h4>
              <Dropdown data={this.state.dropdownData} size="small" />
            </div>
            <div className={styles.paragraphsCardCharts}>
              <NestedDonutChart />
              <Labels
                data={this.state.labelData}
                orientation={this.state.labelOrientation}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
