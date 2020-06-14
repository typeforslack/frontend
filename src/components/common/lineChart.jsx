import React, { Component } from 'react'
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
    marginTop: 10,
    marginRight: 10,
    marginBottom: 30,
    marginLeft: 30,
  }

  render() {
    const LABEL_PADDING = 5
    const PADDING_LEFT = 20

    const {
      data,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
    } = this.state
    const width = this.props.width - marginLeft - marginRight
    const height = this.props.height - marginBottom - marginTop

    let x = scaleTime()
      .domain(
        extent(data, function (d) {
          return d.date
        }),
      )
      .range([0, width])

    let y = scaleLinear()
      .domain([
        0,
        max(data, function (d) {
          return +d.value
        }),
      ])
      .range([height, 0])

    const generateLine = line()
      .x(function (d) {
        return x(d.date)
      })
      .y(function (d) {
        return y(d.value)
      })
      .curve(curveMonotoneX)

    return (
      <div className="dashboard-line-chart">
        <svg
          height={height + marginTop + marginBottom}
          width={width + marginLeft + marginRight}>
          <g
            className="dashboard-chart-x"
            transform={`translate(${marginLeft}, ${
              height + PADDING_LEFT + LABEL_PADDING
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
              marginLeft - LABEL_PADDING
            }, ${PADDING_LEFT})`}
            ref={(node) =>
              select(node)
                .call(axisLeft(y).tickSize(0))
                .call((g) => g.select('.domain').remove())
            }
          />
          <path
            className="dashboard-chart-line"
            transform={`translate(${marginLeft}, ${PADDING_LEFT})`}
            d={generateLine(data)}
            fill="none"
            stroke="#ffab00"
            strokeWidth="3"
          />
          {data.map((item, i) => (
            <circle
              key={i}
              className="dashboard-chart-circle"
              transform={`translate(${marginLeft}, ${PADDING_LEFT})`}
              r="5"
              cx={x(item.date)}
              cy={y(item.value)}
              fill="#ffab00"
            />
          ))}
        </svg>
      </div>
    )
  }
}
