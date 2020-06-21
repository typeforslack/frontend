import React, { Component } from 'react'
import styles from './progressCard.module.css'
import LineChart from '../../common/charts/lineChart'
import Button from './button'
import Dropdown from './dropdown'
import Labels from './labels'

export default class ProgressCard extends Component {
  state = {
    // Show Weekly progress by default
    weekly: true,
    monthly: false,
    yearly: false,
    labelData: [
      {
        title: 'WPM',
        color: '#F0A500',
      },
      {
        title: 'Accuracy',
        color: '#EC486F',
      },
    ],
    labelOrientation: 'horizontal',
    dropdownOptions: ['All', 'Practise', 'Arena'],
  }

  weeklyData = () => {
    if (this.state.weekly === true) return
    // console.log("Processing and loading weekly data!")
    this.setState({
      weekly: true,
      monthly: false,
      yearly: false,
    })
  }

  monthlyData = () => {
    if (this.state.monthly === true) return
    // console.log("Processing and loading monthly data!")
    this.setState({
      weekly: false,
      monthly: true,
      yearly: false,
    })
  }

  yearlyData = () => {
    if (this.state.yearly === true) return
    // console.log("Processing and loading yearly data!")
    this.setState({
      weekly: false,
      monthly: false,
      yearly: true,
    })
  }

  render() {
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <Dropdown data={this.state.dropdownOptions} size="medium" />
          <Labels
            data={this.state.labelData}
            orientation={this.state.labelOrientation}
          />
        </div>
        <div className={styles.chartContainer}>
          <LineChart width={870} height={300} />
        </div>
        <div className={styles.controls}>
          <Button
            text="Weekly"
            state={this.state.weekly}
            toggleData={this.weeklyData}
          />
          <Button
            text="Monthly"
            state={this.state.monthly}
            toggleData={this.monthlyData}
          />
          <Button
            text="Yearly"
            state={this.state.yearly}
            toggleData={this.yearlyData}
          />
        </div>
      </div>
    )
  }
}
