import React, { Component } from 'react'
import LineChart from '../common/lineChart'
import NestedDonutChart from '../common/nestedDonutChart'
import Labels from './labels'
import Dropdown from './dropdown'
import Card from './card'
import styles from './dashboard.module.css'
import './card.css'

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
        <div>
          <nav className="nav">
            <a
              href="/dashboard"
              className="nav-item is-active"
              active-color="orange">
              TypeForSlack
            </a>
            <a href="/dashboard" className="nav-item" active-color="green">
              Dashboard
            </a>
            <a href="/dashboard" className="nav-item" active-color="blue">
              Practice
            </a>
            <a href="/dashboard" className="nav-item" active-color="red">
              Arcade
            </a>
            <a
              href="/dashboard"
              className="nav-item"
              active-color="rebeccapurple">
              Race
            </a>
            <span className="nav-indicator"></span>
          </nav>
          <br />
          <br />
        </div>
        <div className="dashBoard">
          <Card />
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
