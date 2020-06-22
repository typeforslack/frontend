import React, { Component } from 'react'
import styles from './card.module.css'

export default class Card extends Component {
  render() {
    return (
      <div className={styles.card}>
        <div
          className={styles.cardMargin}
          style={{ backgroundColor: this.props.color }}></div>
        <h2>{this.props.title}</h2>
        <p>{this.props.desc}</p>
      </div>
    )
  }
}
