import React from 'react'
import styles from './card.module.css'

export default function Card(props) {
  return (
    <div className={styles.card}>
      <div
        className={styles.cardMargin}
        style={{ backgroundColor: props.color }}></div>
      <h2>{props.title}</h2>
      <p>{props.desc}</p>
    </div>
  )
}
