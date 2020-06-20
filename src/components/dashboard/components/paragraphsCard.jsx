import React, { Component } from 'react'
import NestedDonutChart from '../../common/charts/nestedDonutChart'
import Labels from './labels'
import Dropdown from './dropdown'
import styles from './paragraphsCard.module.css'

export default class ParagraphsCard extends Component {
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
    )
  }
}
