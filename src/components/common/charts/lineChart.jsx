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
  area,
  curveMonotoneX,
  timeDay,
  timeFormat,
} from 'd3'
import styles from './lineChart.module.css'

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

    const x = scaleTime()
      .domain(
        extent(data, function (d) {
          return d.date
        }),
      )
      .range([0, WIDTH])

    const y = scaleLinear()
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

    const generateArea = area()
      .x((d) => {
        return x(d.date)
      })
      .y0(y(0))
      .y1((d) => {
        return y(d.value)
      })
      .curve(curveMonotoneX)

    return (
      <svg
        height={HEIGHT + MARGIN_TOP + MARGIN_BOTTOM}
        width={WIDTH + MARGIN_LEFT + MARGIN_RIGHT}>
        <linearGradient id="areaGradient" gradientTransform="rotate(90)">
          <stop offset="40%" stopColor="#ffab00" />
          <stop offset="99%" stopColor="white" />
        </linearGradient>
        <g
          className={styles.xAxis}
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
          className={styles.yAxis}
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
          transform={`translate(${MARGIN_LEFT}, ${PADDING_LEFT})`}
          d={generateLine(data)}
          fill="none"
          stroke="#ffab00"
          strokeWidth="3"
        />
        <path
          transform={`translate(${MARGIN_LEFT}, ${PADDING_LEFT})`}
          d={generateArea(data)}
          fill={'url(#areaGradient)'}
          // stroke={"#69b3a2"}
          // strokeWidth={"1.5"}
          opacity={0.4}
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
    )
  }
}
