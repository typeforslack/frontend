import React, { Component } from 'react'
import Button from '../dashboard/button'
import Dropdown from '../dashboard/dropdown'
import Labels from '../dashboard/labels'
import {
  select,
  scaleTime,
  extent,
  axisBottom,
  scaleLinear,
  max,
  axisLeft,
  line,
  curveMonotoneX,
  timeDay,
  timeFormat,
} from 'd3'
import styles from './lineChart.module.css'
import './lineChart.css'

export default class LineChart extends Component {
  state = {
    data: [
      {
        date: new Date('2020-04-21'),
        value: 0,
      },
      {
        date: new Date('2020-04-22'),
        value: 70,
      },
      {
        date: new Date('2020-04-23'),
        value: 90,
      },
      {
        date: new Date('2020-04-24'),
        value: 40,
      },
      {
        date: new Date('2020-04-25'),
        value: 90,
      },
      {
        date: new Date('2020-04-26'),
        value: 90,
      },
      {
        date: new Date('2020-04-27'),
        value: 90,
      },
    ],
    // Show Weekly progress by default
    weekly: true,
    monthly: false,
    yearly: false,
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
    const LABEL_PADDING = 5,
      PADDING_LEFT = 20,
      MARGIN_TOP = 10,
      MARGIN_BOTTOM = 30,
      MARGIN_LEFT = 40,
      MARGIN_RIGHT = 20,
      WIDTH = this.props.width - MARGIN_LEFT - MARGIN_RIGHT,
      HEIGHT = this.props.height - MARGIN_BOTTOM - MARGIN_TOP

    const data = this.state.data

    let x = scaleTime()
      .domain(
        extent(data, function (d) {
          return d.date
        }),
      )
      .range([0, WIDTH])

    let y = scaleLinear()
      .domain([
        0,
        max(data, function (d) {
          return +d.value
        }),
      ])
      .range([HEIGHT, 0])

    const generateLine = line()
      .x(function (d) {
        return x(d.date)
      })
      .y(function (d) {
        return y(d.value)
      })
      .curve(curveMonotoneX)

    return (
      <div className={styles.dashboardChart}>
        <div className={styles.dashboardChartHeader}>
          <Dropdown />
          <Labels />
        </div>
        <div className={styles.dashboardLineChart}>
          <svg
            height={HEIGHT + MARGIN_TOP + MARGIN_BOTTOM}
            width={WIDTH + MARGIN_LEFT + MARGIN_RIGHT}>
            <g
              className="dashboard-chart-x"
              transform={`translate(${MARGIN_LEFT}, ${
                HEIGHT + PADDING_LEFT + LABEL_PADDING
              })`}
              ref={(node) =>
                select(node)
                  .call(
                    axisBottom(x)
                      .tickSize(0)
                      .ticks(timeDay.every(1))
                      .tickFormat(timeFormat('%a')),
                  )
                  .call((g) => g.select('.domain').remove())
              }
            />
            <g
              className="dashboard-chart-y"
              transform={`translate(${
                MARGIN_LEFT - LABEL_PADDING
              }, ${PADDING_LEFT})`}
              ref={(node) =>
                select(node)
                  .call(axisLeft(y).tickSize(0))
                  .call((g) => g.select('.domain').remove())
              }
            />
            <path
              className="dashboard-chart-line"
              transform={`translate(${MARGIN_LEFT}, ${PADDING_LEFT})`}
              d={generateLine(data)}
              fill="none"
              stroke="#ffab00"
              strokeWidth="3"
            />
            {data.map((item, i) => (
              <circle
                key={i}
                className="dashboard-chart-circle"
                transform={`translate(${MARGIN_LEFT}, ${PADDING_LEFT})`}
                r="5"
                cx={x(item.date)}
                cy={y(item.value)}
                fill="#ffab00"
              />
            ))}
          </svg>
        </div>
        <div className={styles.dasboardChartControls}>
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
