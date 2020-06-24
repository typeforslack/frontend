import React from 'react'
import styles from './card.module.css'

export default function Card({ title, desc, color }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardMargin} style={{ backgroundColor: color }} />
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  )
}
