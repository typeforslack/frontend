import React from 'react'
import styles from './labels.module.css'

export default function Labels({ data, orientation }) {
  return (
    <div
      className={styles.labels}
      style={{
        flexDirection: orientation === 'horizontal' ? 'row' : 'column',
        justifyContent:
          orientation === 'horizontal' ? 'flex-start' : 'space-evenly',
      }}>
      {data.map((label, i) => (
        <div key={i} className={styles.labelContainer}>
          <div className={styles.label} style={{ background: label.color }} />
          <p className={styles.labelText}>{label.title}</p>
        </div>
      ))}
    </div>
  )
}
